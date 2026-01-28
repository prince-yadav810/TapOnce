/**
 * @file Customer Profile API Route
 * @description API for customers to view and update their own profile
 * 
 * @owner Dev 1
 * 
 * Security:
 * - Requires authenticated customer
 * - Can only update own profile
 * - Validates input data
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface ProfileUpdatePayload {
    fullName?: string
    jobTitle?: string
    company?: string
    bio?: string
    phone?: string
    whatsapp?: string
    linkedinUrl?: string
    instagramUrl?: string
    facebookUrl?: string
    twitterUrl?: string
    websiteUrl?: string
}

/**
 * GET /api/customer/profile
 * Get current customer's profile
 */
export async function GET(request: NextRequest) {
    try {
        const supabase = createServerSupabaseClient()

        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Check if user is customer or admin viewing
        const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, phone, avatar_url, role')
            .eq('id', user.id)
            .single()

        if (!profile) {
            return NextResponse.json(
                { error: 'Profile not found' },
                { status: 404 }
            )
        }

        // Fetch customer record
        const { data: customer } = await supabase
            .from('customers')
            .select('*')
            .eq('profile_id', user.id)
            .single()

        return NextResponse.json({
            profile: {
                fullName: profile.full_name,
                phone: profile.phone,
                avatarUrl: profile.avatar_url,
                email: user.email
            },
            customer: customer ? {
                id: customer.id,
                slug: customer.slug,
                company: customer.company,
                jobTitle: customer.job_title,
                bio: customer.bio,
                whatsapp: customer.whatsapp,
                linkedinUrl: customer.linkedin_url,
                instagramUrl: customer.instagram_url,
                facebookUrl: customer.facebook_url,
                twitterUrl: customer.twitter_url,
                websiteUrl: customer.website_url,
                status: customer.status
            } : null
        })

    } catch (error) {
        console.error('Get profile error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

/**
 * PATCH /api/customer/profile
 * Update current customer's profile
 */
export async function PATCH(request: NextRequest) {
    try {
        const payload: ProfileUpdatePayload = await request.json()

        const supabase = createServerSupabaseClient()

        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Update profile table (basic info)
        if (payload.fullName || payload.phone) {
            const profileUpdate: Record<string, any> = {
                updated_at: new Date().toISOString()
            }
            if (payload.fullName) profileUpdate.full_name = payload.fullName.trim()
            if (payload.phone) profileUpdate.phone = payload.phone.replace(/\D/g, '')

            const { error: profileError } = await supabase
                .from('profiles')
                .update(profileUpdate)
                .eq('id', user.id)

            if (profileError) {
                console.error('Error updating profile:', profileError)
            }
        }

        // Update customer table (extended info)
        const customerUpdate: Record<string, any> = {
            updated_at: new Date().toISOString()
        }

        if (payload.jobTitle !== undefined) customerUpdate.job_title = payload.jobTitle?.trim() || null
        if (payload.company !== undefined) customerUpdate.company = payload.company?.trim() || null
        if (payload.bio !== undefined) customerUpdate.bio = payload.bio?.slice(0, 500)?.trim() || null
        if (payload.whatsapp !== undefined) customerUpdate.whatsapp = payload.whatsapp?.replace(/\D/g, '') || null
        if (payload.linkedinUrl !== undefined) customerUpdate.linkedin_url = payload.linkedinUrl?.trim() || null
        if (payload.instagramUrl !== undefined) customerUpdate.instagram_url = payload.instagramUrl?.trim() || null
        if (payload.facebookUrl !== undefined) customerUpdate.facebook_url = payload.facebookUrl?.trim() || null
        if (payload.twitterUrl !== undefined) customerUpdate.twitter_url = payload.twitterUrl?.trim() || null
        if (payload.websiteUrl !== undefined) customerUpdate.website_url = payload.websiteUrl?.trim() || null

        const { error: customerError } = await supabase
            .from('customers')
            .update(customerUpdate)
            .eq('profile_id', user.id)

        if (customerError) {
            console.error('Error updating customer:', customerError)
            return NextResponse.json(
                { error: 'Failed to update profile' },
                { status: 500 }
            )
        }

        console.log(`Customer profile updated: ${user.id}`)

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully'
        })

    } catch (error) {
        console.error('Update profile error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
