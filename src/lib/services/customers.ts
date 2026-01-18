/**
 * @file Customers Service
 * @description Data service for customer operations
 * 
 * @owner Dev 1
 */

import { createClient } from '@/lib/supabase/client'
import { Customer, CustomerStatus } from '@/types/customer'

export interface CustomerListItem {
    id: string
    profileId: string
    slug: string
    fullName: string
    email: string
    phone: string
    company: string | null
    jobTitle: string | null
    avatarUrl: string | null
    status: CustomerStatus
    createdAt: string
}

export interface CustomersResponse {
    customers: CustomerListItem[]
    total: number
}

/**
 * Fetch customers with optional filters
 */
export async function getCustomers(filters?: {
    status?: CustomerStatus
    search?: string
    page?: number
    limit?: number
}): Promise<CustomersResponse> {
    const supabase = createClient()
    const page = filters?.page || 1
    const limit = filters?.limit || 20
    const offset = (page - 1) * limit

    let query = supabase
        .from('customers')
        .select(`
            id,
            profile_id,
            slug,
            company,
            job_title,
            status,
            created_at,
            profiles (
                full_name,
                phone,
                avatar_url
            )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (filters?.status) {
        query = query.eq('status', filters.status)
    }

    if (filters?.search) {
        // Search by name, company, or slug
        query = query.or(`slug.ilike.%${filters.search}%,company.ilike.%${filters.search}%`)
    }

    const { data, error, count } = await query

    if (error) {
        console.error('Error fetching customers:', error)
        return { customers: [], total: 0 }
    }

    // Get profile emails separately (from auth.users via profiles)
    const customers: CustomerListItem[] = (data || []).map((customer: any) => ({
        id: customer.id,
        profileId: customer.profile_id,
        slug: customer.slug,
        fullName: customer.profiles?.full_name || 'Unknown',
        email: '', // Will need to fetch from auth if needed
        phone: customer.profiles?.phone || '',
        company: customer.company,
        jobTitle: customer.job_title,
        avatarUrl: customer.profiles?.avatar_url,
        status: customer.status,
        createdAt: customer.created_at
    }))

    return { customers, total: count || 0 }
}

/**
 * Get single customer by ID
 */
export async function getCustomerById(id: string): Promise<Customer | null> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('customers')
        .select(`
            *,
            profiles (
                full_name,
                phone,
                avatar_url
            )
        `)
        .eq('id', id)
        .single()

    if (error || !data) {
        console.error('Error fetching customer:', error)
        return null
    }

    return {
        id: data.id,
        profileId: data.profile_id,
        slug: data.slug,
        fullName: data.profiles?.full_name || '',
        email: '',
        phone: data.profiles?.phone || '',
        avatarUrl: data.profiles?.avatar_url,
        company: data.company,
        jobTitle: data.job_title,
        bio: data.bio,
        whatsapp: data.whatsapp,
        linkedinUrl: data.linkedin_url,
        instagramUrl: data.instagram_url,
        facebookUrl: data.facebook_url,
        twitterUrl: data.twitter_url,
        websiteUrl: data.website_url,
        customLinks: data.custom_links || [],
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    }
}

/**
 * Update customer status
 */
export async function updateCustomerStatus(
    id: string,
    status: CustomerStatus
): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient()

    const { error } = await supabase
        .from('customers')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error updating customer status:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}
