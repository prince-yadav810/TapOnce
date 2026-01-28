/**
 * @file Customer Creation Helper
 * @description Creates customer accounts when orders are approved
 * 
 * @owner Dev 1
 * 
 * Security:
 * - Uses admin client for auth user creation
 * - Generates secure random passwords
 * - Creates proper profile and customer records
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail, getCustomerWelcomeEmail } from '@/lib/email/brevo'

interface CustomerData {
    fullName: string
    email: string
    phone: string
    company?: string
}

interface CreateCustomerResult {
    success: boolean
    customerId?: string
    profileId?: string
    slug?: string
    credentials?: {
        email: string
        password: string
    }
    error?: string
}

/**
 * Generate a secure random password
 */
function generatePassword(length: number = 12): string {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%'
    let password = ''
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
}

/**
 * Generate a unique slug from customer name
 */
function generateSlug(name: string, suffix?: string): string {
    const baseSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 30)

    const random = Math.random().toString(36).substring(2, 6)
    return suffix ? `${baseSlug}-${suffix}` : `${baseSlug}-${random}`
}

/**
 * Create a customer account and profile
 * Called when admin approves an order
 */
export async function createCustomerAccount(
    customerData: CustomerData,
    orderId: string
): Promise<CreateCustomerResult> {
    const supabase = createAdminClient()

    try {
        // Check if user already exists with this email
        const { data: existingUsers } = await supabase.auth.admin.listUsers()
        const existingUser = existingUsers?.users?.find(
            u => u.email?.toLowerCase() === customerData.email.toLowerCase()
        )

        if (existingUser) {
            // User exists, check if they have a customer record
            const { data: existingCustomer } = await supabase
                .from('customers')
                .select('id, slug')
                .eq('profile_id', existingUser.id)
                .single()

            if (existingCustomer) {
                // Link order to existing customer
                await supabase
                    .from('orders')
                    .update({ customer_id: existingCustomer.id })
                    .eq('id', orderId)

                return {
                    success: true,
                    customerId: existingCustomer.id,
                    profileId: existingUser.id,
                    slug: existingCustomer.slug
                }
            }
        }

        // Generate credentials
        const password = generatePassword()
        const slug = generateSlug(customerData.fullName)

        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: customerData.email,
            password: password,
            email_confirm: true, // Auto-confirm email
            user_metadata: {
                full_name: customerData.fullName,
                role: 'customer'
            }
        })

        if (authError) {
            console.error('Error creating auth user:', authError)
            return {
                success: false,
                error: `Failed to create user account: ${authError.message}`
            }
        }

        const userId = authData.user.id

        // Profile should be auto-created by trigger, but let's ensure it exists
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', userId)
            .single()

        if (!profile) {
            // Create profile manually if trigger didn't work
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: userId,
                    role: 'customer',
                    full_name: customerData.fullName,
                    phone: customerData.phone
                })

            if (profileError) {
                console.error('Error creating profile:', profileError)
            }
        } else {
            // Update phone if profile exists
            await supabase
                .from('profiles')
                .update({ phone: customerData.phone })
                .eq('id', userId)
        }

        // Create customer record
        const { data: customer, error: customerError } = await supabase
            .from('customers')
            .insert({
                profile_id: userId,
                slug: slug,
                company: customerData.company || null,
                status: 'active'
            })
            .select('id')
            .single()

        if (customerError) {
            console.error('Error creating customer:', customerError)
            return {
                success: false,
                error: `Failed to create customer profile: ${customerError.message}`
            }
        }

        // Link order to customer
        await supabase
            .from('orders')
            .update({
                customer_id: customer.id,
                portfolio_slug: slug
            })
            .eq('id', orderId)

        console.log(`Customer account created: ${customerData.email}, slug: ${slug}`)

        return {
            success: true,
            customerId: customer.id,
            profileId: userId,
            slug: slug,
            credentials: {
                email: customerData.email,
                password: password
            }
        }

    } catch (error) {
        console.error('Error in createCustomerAccount:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Send welcome email with login credentials
 */
export async function sendCustomerWelcomeEmail(params: {
    customerName: string
    customerEmail: string
    orderNumber: number
    credentials: { email: string; password: string }
    slug: string
}): Promise<boolean> {
    const profileUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://taponce.in'}/${params.slug}`
    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://taponce.in'}/login`

    const emailData = getCustomerWelcomeEmail({
        customerName: params.customerName,
        orderNumber: params.orderNumber,
        profileUrl: profileUrl,
        loginUrl: loginUrl,
        username: params.credentials.email,
        password: params.credentials.password
    })

    const result = await sendEmail({
        to: { email: params.customerEmail, name: params.customerName },
        subject: emailData.subject,
        htmlContent: emailData.html,
        tags: ['customer-welcome', 'credentials']
    })

    return !result.error
}
