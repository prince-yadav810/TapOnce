/**
 * @file Admin Agents API Route
 * @description Server-side API for fetching agents
 * 
 * @owner Dev 1
 * 
 * Security:
 * - Requires authenticated admin user
 * - Uses server Supabase client (respects RLS)
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/admin/agents
 * Fetch all agents for admin dashboard
 */
export async function GET(request: NextRequest) {
    try {
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

        // Fetch agents with profile data
        const { data: agents, error: agentsError } = await supabase
            .from('agents')
            .select(`
                id,
                profile_id,
                referral_code,
                city,
                upi_id,
                bank_account,
                bank_ifsc,
                bank_holder_name,
                base_commission,
                parent_agent_id,
                status,
                total_sales,
                total_earnings,
                available_balance,
                created_at,
                updated_at,
                profiles:profile_id (
                    full_name,
                    phone,
                    avatar_url
                )
            `)
            .order('created_at', { ascending: false })

        if (agentsError) {
            console.error('Error fetching agents:', agentsError)
            return NextResponse.json(
                { error: 'Failed to fetch agents' },
                { status: 500 }
            )
        }

        // Get email from auth.users for each agent
        // Note: This requires service role, so we'll skip for now
        // In production, you'd store email in profiles table

        // Transform agents for frontend
        const transformedAgents = (agents || []).map((agent: any) => ({
            id: agent.id,
            profileId: agent.profile_id,
            fullName: agent.profiles?.full_name || 'Unknown',
            email: '', // Would need service role to get from auth.users
            phone: agent.profiles?.phone || '',
            referralCode: agent.referral_code,
            city: agent.city,
            upiId: agent.upi_id,
            bankAccount: agent.bank_account,
            bankIfsc: agent.bank_ifsc,
            bankHolderName: agent.bank_holder_name,
            baseCommission: agent.base_commission,
            parentAgentId: agent.parent_agent_id,
            totalSales: agent.total_sales,
            totalEarnings: agent.total_earnings,
            availableBalance: agent.available_balance,
            status: agent.status,
            createdAt: agent.created_at,
            updatedAt: agent.updated_at
        }))

        return NextResponse.json({
            agents: transformedAgents,
            total: transformedAgents.length
        })

    } catch (error) {
        console.error('Admin agents API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
