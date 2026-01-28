/**
 * @file Order Rejection API Route
 * @description Rejects an order with reason
 * 
 * @owner Dev 1
 * 
 * Security:
 * - Requires authenticated admin user
 * - Validates order exists and is pending
 * - Records rejection reason
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

interface RejectPayload {
    reason: string
}

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const orderId = params.id
        const payload: RejectPayload = await request.json()

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            )
        }

        if (!payload.reason || payload.reason.trim().length === 0) {
            return NextResponse.json(
                { error: 'Rejection reason is required' },
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

        // Use admin client for update
        const adminSupabase = createAdminClient()

        // Fetch the order
        const { data: order, error: orderError } = await adminSupabase
            .from('orders')
            .select('id, order_number, status')
            .eq('id', orderId)
            .single()

        if (orderError || !order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            )
        }

        // Check if order can be rejected
        if (!['pending_approval', 'approved'].includes(order.status)) {
            return NextResponse.json(
                { error: `Order cannot be rejected. Current status: ${order.status}` },
                { status: 400 }
            )
        }

        // Update order status to rejected
        const { error: updateError } = await adminSupabase
            .from('orders')
            .update({
                status: 'rejected',
                rejection_reason: payload.reason.trim(),
                updated_at: new Date().toISOString()
            })
            .eq('id', orderId)

        if (updateError) {
            console.error('Error rejecting order:', updateError)
            return NextResponse.json(
                { error: 'Failed to reject order' },
                { status: 500 }
            )
        }

        console.log(`Order #${order.order_number} rejected by admin ${user.id}. Reason: ${payload.reason}`)

        return NextResponse.json({
            success: true,
            message: 'Order rejected',
            order: {
                id: orderId,
                orderNumber: order.order_number,
                status: 'rejected'
            }
        })

    } catch (error) {
        console.error('Order rejection error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
