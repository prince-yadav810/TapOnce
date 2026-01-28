/**
 * @file Admin Agent Update API Route
 * @description Server-side API for updating individual agent
 * 
 * @owner Dev 1
 * 
 * Security:
 * - Requires authenticated admin user
 * - Validates inputs
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

interface UpdateAgentPayload {
    status?: 'active' | 'inactive'
    baseCommission?: number
    city?: string
    upiId?: string
    bankAccount?: string
    bankIfsc?: string
    bankHolderName?: string
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const agentId = params.id
        const payload: UpdateAgentPayload = await request.json()

        if (!agentId) {
            return NextResponse.json(
                { error: 'Agent ID is required' },
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

        // Build update object
        const updateData: Record<string, any> = {
            updated_at: new Date().toISOString()
        }

        if (payload.status) {
            if (!['active', 'inactive'].includes(payload.status)) {
                return NextResponse.json(
                    { error: 'Invalid status. Must be active or inactive.' },
                    { status: 400 }
                )
            }
            updateData.status = payload.status
        }

        if (payload.baseCommission !== undefined) {
            updateData.base_commission = payload.baseCommission
        }

        if (payload.city !== undefined) {
            updateData.city = payload.city
        }

        if (payload.upiId !== undefined) {
            updateData.upi_id = payload.upiId
        }

        if (payload.bankAccount !== undefined) {
            updateData.bank_account = payload.bankAccount
        }

        if (payload.bankIfsc !== undefined) {
            updateData.bank_ifsc = payload.bankIfsc
        }

        if (payload.bankHolderName !== undefined) {
            updateData.bank_holder_name = payload.bankHolderName
        }

        // Use admin client for update (bypasses RLS if needed)
        const adminSupabase = createAdminClient()

        const { data: agent, error: updateError } = await adminSupabase
            .from('agents')
            .update(updateData)
            .eq('id', agentId)
            .select('id, status')
            .single()

        if (updateError) {
            console.error('Error updating agent:', updateError)
            return NextResponse.json(
                { error: 'Failed to update agent' },
                { status: 500 }
            )
        }

        if (!agent) {
            return NextResponse.json(
                { error: 'Agent not found' },
                { status: 404 }
            )
        }

        console.log(`Agent ${agentId} updated by admin ${user.id}`)

        return NextResponse.json({
            success: true,
            agent: {
                id: agent.id,
                status: agent.status
            }
        })

    } catch (error) {
        console.error('Agent update API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
