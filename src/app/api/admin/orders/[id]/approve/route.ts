/**
 * @file Order Approval API Route
 * @description Approves an order and creates customer account
 * 
 * @owner Dev 1
 * 
 * Security:
 * - Requires authenticated admin user
 * - Validates order exists and is pending
 * - Creates customer account with secure password
 * - Sends credentials via email
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createCustomerAccount, sendCustomerWelcomeEmail } from '@/lib/auth/create-customer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const orderId = params.id

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            )
        }

        const supabase = createServerSupabaseClient()

        // Verify user is authenticated and is admin
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Check if user is admin
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            return NextResponse.json(
                { error: 'Access denied. Admin only.' },
                { status: 403 }
            )
        }

        // Fetch the order using admin client (bypasses RLS)
        const adminSupabase = createAdminClient()

        const { data: order, error: orderError } = await adminSupabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single()

        if (orderError || !order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            )
        }

        // Check if order is in pending_approval status
        if (order.status !== 'pending_approval') {
            return NextResponse.json(
                { error: `Order cannot be approved. Current status: ${order.status}` },
                { status: 400 }
            )
        }

        // Create customer account
        const customerResult = await createCustomerAccount(
            {
                fullName: order.customer_name,
                email: order.customer_email,
                phone: order.customer_phone,
                company: order.customer_company
            },
            orderId
        )

        if (!customerResult.success) {
            return NextResponse.json(
                { error: customerResult.error || 'Failed to create customer account' },
                { status: 500 }
            )
        }

        // Update order status to approved
        const { error: updateError } = await adminSupabase
            .from('orders')
            .update({
                status: 'approved',
                approved_at: new Date().toISOString(),
                customer_id: customerResult.customerId,
                portfolio_slug: customerResult.slug,
                updated_at: new Date().toISOString()
            })
            .eq('id', orderId)

        if (updateError) {
            console.error('Error updating order status:', updateError)
            return NextResponse.json(
                { error: 'Order approved but failed to update status' },
                { status: 500 }
            )
        }

        // Send welcome email with credentials (if new customer)
        if (customerResult.credentials) {
            const emailSent = await sendCustomerWelcomeEmail({
                customerName: order.customer_name,
                customerEmail: order.customer_email,
                orderNumber: order.order_number,
                credentials: customerResult.credentials,
                slug: customerResult.slug!
            })

            if (!emailSent) {
                console.error('Failed to send welcome email to:', order.customer_email)
                // Don't fail the whole operation, just log it
            }
        }

        console.log(`Order #${order.order_number} approved by admin ${user.id}. Customer: ${customerResult.customerId}`)

        return NextResponse.json({
            success: true,
            message: 'Order approved successfully',
            order: {
                id: orderId,
                orderNumber: order.order_number,
                status: 'approved'
            },
            customer: {
                id: customerResult.customerId,
                slug: customerResult.slug,
                isNew: !!customerResult.credentials
            }
        })

    } catch (error) {
        console.error('Order approval error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
