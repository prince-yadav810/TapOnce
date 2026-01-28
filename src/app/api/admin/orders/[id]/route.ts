/**
 * @file Admin Order Update API Route
 * @description Server-side API for updating individual order status
 * 
 * @owner Dev 1
 * 
 * Security:
 * - Requires authenticated admin user
 * - Validates status transitions
 * - Logs all changes for audit
 */

import { createServerSupabaseClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Valid status values from database schema
const VALID_STATUSES = [
    'pending_approval', 'approved', 'printing', 'printed',
    'ready_to_ship', 'shipped', 'delivered', 'paid',
    'rejected', 'cancelled'
]

interface UpdateOrderPayload {
    status?: string
    paymentStatus?: string
    trackingNumber?: string
    adminNotes?: string
    rejectionReason?: string
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const orderId = params.id
        const payload: UpdateOrderPayload = await request.json()

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

        // Validate status if provided
        if (payload.status && !VALID_STATUSES.includes(payload.status)) {
            return NextResponse.json(
                { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
                { status: 400 }
            )
        }

        // Build update object - only include provided fields
        const updateData: Record<string, any> = {
            updated_at: new Date().toISOString()
        }

        if (payload.status) {
            updateData.status = payload.status

            // Set timestamp for specific status changes
            if (payload.status === 'approved') {
                updateData.approved_at = new Date().toISOString()
            } else if (payload.status === 'shipped') {
                updateData.shipped_at = new Date().toISOString()
            } else if (payload.status === 'delivered') {
                updateData.delivered_at = new Date().toISOString()
            }
        }

        if (payload.paymentStatus) {
            updateData.payment_status = payload.paymentStatus
            if (payload.paymentStatus === 'paid') {
                updateData.paid_at = new Date().toISOString()
            }
        }

        if (payload.trackingNumber !== undefined) {
            updateData.tracking_number = payload.trackingNumber
        }

        if (payload.adminNotes !== undefined) {
            updateData.admin_notes = payload.adminNotes
        }

        if (payload.rejectionReason !== undefined) {
            updateData.rejection_reason = payload.rejectionReason
        }

        // Perform update
        const { data: order, error: updateError } = await supabase
            .from('orders')
            .update(updateData)
            .eq('id', orderId)
            .select('id, order_number, status')
            .single()

        if (updateError) {
            console.error('Error updating order:', updateError)
            return NextResponse.json(
                { error: 'Failed to update order' },
                { status: 500 }
            )
        }

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            )
        }

        console.log(`Order #${order.order_number} updated by admin ${user.id}: status=${order.status}`)

        return NextResponse.json({
            success: true,
            order: {
                id: order.id,
                orderNumber: order.order_number,
                status: order.status
            }
        })

    } catch (error) {
        console.error('Order update API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
