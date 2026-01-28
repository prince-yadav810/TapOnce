/**
 * @file Admin Orders API Route
 * @description Server-side API for fetching and managing orders
 * 
 * @owner Dev 1
 * 
 * Security:
 * - Requires authenticated admin user
 * - Uses server Supabase client (respects RLS)
 * - Validates all inputs
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/admin/orders
 * Fetch all orders for admin dashboard
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
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profileError || profile?.role !== 'admin') {
            return NextResponse.json(
                { error: 'Access denied. Admin only.' },
                { status: 403 }
            )
        }

        // Fetch orders with related data
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select(`
                id,
                order_number,
                customer_name,
                customer_email,
                customer_phone,
                customer_whatsapp,
                customer_photo_url,
                line1_text,
                line2_text,
                msp_at_order,
                sale_price,
                commission_amount,
                status,
                payment_status,
                is_direct_sale,
                is_below_msp,
                portfolio_slug,
                shipping_address,
                tracking_number,
                special_instructions,
                admin_notes,
                rejection_reason,
                created_at,
                updated_at,
                approved_at,
                shipped_at,
                delivered_at,
                card_design_id,
                agent_id
            `)
            .order('created_at', { ascending: false })

        if (ordersError) {
            console.error('Error fetching orders:', ordersError)
            return NextResponse.json(
                { error: 'Failed to fetch orders' },
                { status: 500 }
            )
        }

        // Fetch agents for lookup
        const { data: agents } = await supabase
            .from('agents')
            .select(`
                id,
                referral_code,
                profile_id,
                profiles:profile_id (
                    full_name
                )
            `)

        // Create agent lookup map
        const agentMap = new Map()
        agents?.forEach((agent: any) => {
            agentMap.set(agent.id, {
                id: agent.id,
                fullName: agent.profiles?.full_name || 'Unknown Agent',
                referralCode: agent.referral_code
            })
        })

        // Fetch card designs for lookup
        const { data: designs } = await supabase
            .from('card_designs')
            .select('id, name')

        const designMap = new Map()
        designs?.forEach((design: any) => {
            designMap.set(design.id, design.name)
        })

        // Transform orders for frontend
        const transformedOrders = (orders || []).map((order: any) => {
            const agent = order.agent_id ? agentMap.get(order.agent_id) : null

            return {
                id: order.id,
                orderNumber: order.order_number,
                customerName: order.customer_name,
                customerEmail: order.customer_email,
                customerPhone: order.customer_phone,
                status: order.status,
                paymentStatus: order.payment_status,
                msp: order.msp_at_order,
                salePrice: order.sale_price,
                commission: order.commission_amount,
                createdAt: order.created_at,
                designName: designMap.get(order.card_design_id) || 'Custom Design',
                agentId: order.agent_id,
                agentName: agent?.fullName,
                isDirectSale: order.is_direct_sale,
                isBelowMsp: order.is_below_msp,
                shippingAddress: order.shipping_address,
                line1Text: order.line1_text,
                line2Text: order.line2_text,
                trackingNumber: order.tracking_number,
                specialInstructions: order.special_instructions,
                adminNotes: order.admin_notes
            }
        })

        return NextResponse.json({
            orders: transformedOrders,
            total: transformedOrders.length
        })

    } catch (error) {
        console.error('Admin orders API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
