/**
 * @file Orders Service
 * @description Data service for order operations
 * 
 * @owner Dev 1
 */

import { createClient } from '@/lib/supabase/client'
import { OrderStatus } from '@/types/order'

export interface OrderListItem {
    id: string
    orderNumber: number
    customerName: string
    customerCompany: string | null
    customerPhone: string
    customerPhotoUrl: string | null
    cardDesign: {
        id: string
        name: string
        previewUrl: string | null
    }
    agent: {
        id: string
        fullName: string
        referralCode: string
    } | null
    salePrice: number
    mspAtOrder: number
    commissionAmount: number
    status: OrderStatus
    paymentStatus: string
    isDirectSale: boolean
    isBelowMsp: boolean
    createdAt: string
}

export interface OrdersResponse {
    orders: OrderListItem[]
    total: number
}

/**
 * Fetch orders with optional filters
 */
export async function getOrders(filters?: {
    status?: OrderStatus
    agentId?: string
    search?: string
}): Promise<OrdersResponse> {
    const supabase = createClient()

    let query = supabase
        .from('orders')
        .select(`
            id,
            order_number,
            customer_name,
            customer_company,
            customer_phone,
            customer_photo_url,
            card_design_id,
            agent_id,
            sale_price,
            msp_at_order,
            commission_amount,
            status,
            payment_status,
            is_direct_sale,
            is_below_msp,
            created_at,
            card_designs (
                id,
                name,
                preview_url
            ),
            agents (
                id,
                referral_code,
                profiles (
                    full_name
                )
            )
        `, { count: 'exact' })
        .order('created_at', { ascending: false })

    if (filters?.status) {
        query = query.eq('status', filters.status)
    }

    if (filters?.agentId) {
        query = query.eq('agent_id', filters.agentId)
    }

    if (filters?.search) {
        query = query.or(`customer_name.ilike.%${filters.search}%,order_number.eq.${parseInt(filters.search) || 0}`)
    }

    const { data, error, count } = await query

    if (error) {
        console.error('Error fetching orders:', error)
        return { orders: [], total: 0 }
    }

    const orders: OrderListItem[] = (data || []).map((order: any) => ({
        id: order.id,
        orderNumber: order.order_number,
        customerName: order.customer_name,
        customerCompany: order.customer_company,
        customerPhone: order.customer_phone,
        customerPhotoUrl: order.customer_photo_url,
        cardDesign: order.card_designs ? {
            id: order.card_designs.id,
            name: order.card_designs.name,
            previewUrl: order.card_designs.preview_url
        } : { id: '', name: 'Unknown', previewUrl: null },
        agent: order.agents ? {
            id: order.agents.id,
            fullName: order.agents.profiles?.full_name || 'Unknown',
            referralCode: order.agents.referral_code
        } : null,
        salePrice: order.sale_price,
        mspAtOrder: order.msp_at_order,
        commissionAmount: order.commission_amount,
        status: order.status,
        paymentStatus: order.payment_status,
        isDirectSale: order.is_direct_sale,
        isBelowMsp: order.is_below_msp,
        createdAt: order.created_at
    }))

    return { orders, total: count || 0 }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
    orderId: string,
    newStatus: OrderStatus,
    additionalData?: {
        portfolioSlug?: string
        adminNotes?: string
        rejectionReason?: string
    }
): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient()

    const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString()
    }

    if (newStatus === 'approved') {
        updateData.approved_at = new Date().toISOString()
        if (additionalData?.portfolioSlug) {
            updateData.portfolio_slug = additionalData.portfolioSlug
        }
    }

    if (newStatus === 'shipped') {
        updateData.shipped_at = new Date().toISOString()
    }

    if (newStatus === 'delivered') {
        updateData.delivered_at = new Date().toISOString()
    }

    if (newStatus === 'paid') {
        updateData.paid_at = new Date().toISOString()
    }

    if (newStatus === 'rejected' && additionalData?.rejectionReason) {
        updateData.rejection_reason = additionalData.rejectionReason
    }

    if (additionalData?.adminNotes) {
        updateData.admin_notes = additionalData.adminNotes
    }

    const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)

    if (error) {
        console.error('Error updating order status:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}

/**
 * Get orders grouped by status for Kanban
 */
export async function getOrdersForKanban(): Promise<Record<OrderStatus, OrderListItem[]>> {
    const { orders } = await getOrders()

    const grouped: Record<string, OrderListItem[]> = {
        pending_approval: [],
        approved: [],
        printing: [],
        printed: [],
        ready_to_ship: [],
        shipped: [],
        delivered: [],
        paid: [],
        rejected: [],
        cancelled: []
    }

    orders.forEach(order => {
        if (grouped[order.status]) {
            grouped[order.status].push(order)
        }
    })

    return grouped as Record<OrderStatus, OrderListItem[]>
}
