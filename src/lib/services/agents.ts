/**
 * @file Agents Service
 * @description Data service for agent operations
 * 
 * @owner Dev 1
 */

import { createClient } from '@/lib/supabase/client'
import { Agent, AgentStatus, CreateAgentPayload, PayoutPayload, CommissionLiability } from '@/types/agent'

export interface AgentListItem {
    id: string
    profileId: string
    fullName: string
    email: string
    phone: string
    referralCode: string
    city: string | null
    upiId: string | null
    bankAccount: string | null
    bankIfsc: string | null
    baseCommission: number
    totalSales: number
    totalEarnings: number
    availableBalance: number
    status: AgentStatus
    createdAt: string
}

export interface AgentsResponse {
    agents: AgentListItem[]
    total: number
}

/**
 * Fetch all agents
 */
export async function getAgents(filters?: {
    status?: AgentStatus
    search?: string
}): Promise<AgentsResponse> {
    const supabase = createClient()

    let query = supabase
        .from('agents')
        .select(`
            id,
            profile_id,
            referral_code,
            city,
            upi_id,
            bank_account,
            bank_ifsc,
            base_commission,
            total_sales,
            total_earnings,
            available_balance,
            status,
            created_at,
            profiles (
                full_name,
                phone
            )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })

    if (filters?.status) {
        query = query.eq('status', filters.status)
    }

    if (filters?.search) {
        query = query.or(`referral_code.ilike.%${filters.search}%,city.ilike.%${filters.search}%`)
    }

    const { data, error, count } = await query

    if (error) {
        console.error('Error fetching agents:', error)
        return { agents: [], total: 0 }
    }

    const agents: AgentListItem[] = (data || []).map((agent: any) => ({
        id: agent.id,
        profileId: agent.profile_id,
        fullName: agent.profiles?.full_name || 'Unknown',
        email: '',
        phone: agent.profiles?.phone || '',
        referralCode: agent.referral_code,
        city: agent.city,
        upiId: agent.upi_id,
        bankAccount: agent.bank_account,
        bankIfsc: agent.bank_ifsc,
        baseCommission: agent.base_commission,
        totalSales: agent.total_sales,
        totalEarnings: agent.total_earnings,
        availableBalance: agent.available_balance,
        status: agent.status,
        createdAt: agent.created_at
    }))

    return { agents, total: count || 0 }
}

/**
 * Get agent by ID with full details
 */
export async function getAgentById(id: string): Promise<Agent | null> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('agents')
        .select(`
            *,
            profiles (
                full_name,
                phone
            ),
            agent_msps (
                card_design_id,
                msp_amount,
                card_designs (
                    name
                )
            )
        `)
        .eq('id', id)
        .single()

    if (error || !data) {
        console.error('Error fetching agent:', error)
        return null
    }

    return {
        id: data.id,
        profileId: data.profile_id,
        fullName: data.profiles?.full_name || '',
        email: '',
        phone: data.profiles?.phone || '',
        referralCode: data.referral_code,
        city: data.city,
        upiId: data.upi_id,
        bankAccount: data.bank_account,
        bankIfsc: data.bank_ifsc,
        bankHolderName: data.bank_holder_name,
        baseCommission: data.base_commission,
        parentAgentId: data.parent_agent_id,
        totalSales: data.total_sales,
        totalEarnings: data.total_earnings,
        availableBalance: data.available_balance,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        msps: (data.agent_msps || []).map((msp: any) => ({
            cardDesignId: msp.card_design_id,
            cardDesignName: msp.card_designs?.name || 'Unknown',
            mspAmount: msp.msp_amount
        }))
    }
}

/**
 * Update agent status
 */
export async function updateAgentStatus(
    id: string,
    status: AgentStatus
): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient()

    const { error } = await supabase
        .from('agents')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)

    if (error) {
        console.error('Error updating agent status:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}

/**
 * Process payout for an agent
 */
export async function processPayout(
    agentId: string,
    payload: PayoutPayload
): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient()

    // 1. Get current agent balance
    const { data: agent, error: agentError } = await supabase
        .from('agents')
        .select('available_balance')
        .eq('id', agentId)
        .single()

    if (agentError || !agent) {
        return { success: false, error: 'Agent not found' }
    }

    if (payload.amount > agent.available_balance) {
        return { success: false, error: 'Amount exceeds available balance' }
    }

    // 2. Create payout record
    const { error: payoutError } = await supabase
        .from('payouts')
        .insert({
            agent_id: agentId,
            amount: payload.amount,
            payment_method: payload.paymentMethod,
            admin_notes: payload.adminNotes,
            status: 'completed'
        })

    if (payoutError) {
        console.error('Error creating payout:', payoutError)
        return { success: false, error: payoutError.message }
    }

    // 3. Update agent balance
    const newBalance = agent.available_balance - payload.amount
    const { error: updateError } = await supabase
        .from('agents')
        .update({
            available_balance: newBalance,
            updated_at: new Date().toISOString()
        })
        .eq('id', agentId)

    if (updateError) {
        console.error('Error updating agent balance:', updateError)
        return { success: false, error: updateError.message }
    }

    // 4. Create expense record for commission payout
    await supabase
        .from('expenses')
        .insert({
            category: 'agent_commission',
            amount: payload.amount,
            description: `Payout to agent`,
            expense_date: new Date().toISOString().split('T')[0]
        })

    return { success: true }
}

/**
 * Get commission liabilities (agents with pending payouts)
 */
export async function getCommissionLiabilities(): Promise<CommissionLiability[]> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('agents')
        .select(`
            id,
            available_balance,
            profiles (
                full_name
            ),
            payouts (
                created_at
            )
        `)
        .gt('available_balance', 0)
        .order('available_balance', { ascending: false })

    if (error) {
        console.error('Error fetching liabilities:', error)
        return []
    }

    return (data || []).map((agent: any) => {
        const lastPayout = agent.payouts?.[agent.payouts.length - 1]
        return {
            agentId: agent.id,
            fullName: agent.profiles?.full_name || 'Unknown',
            availableBalance: agent.available_balance,
            lastPayoutDate: lastPayout?.created_at
        }
    })
}
