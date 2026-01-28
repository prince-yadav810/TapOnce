/**
 * @file Submit Order API Route
 * @description Handles direct website order submissions
 * 
 * @owner Dev 1
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail, getOrderConfirmationEmail } from '@/lib/email/brevo'
import { NextRequest, NextResponse } from 'next/server'

interface DirectOrderPayload {
    // Customer details
    customerName: string
    customerPhone: string
    customerEmail: string
    customerWhatsapp?: string

    // Card details
    templateId: string
    templateName: string
    material: 'metal' | 'pvc' | 'wood'
    line1Text: string
    line2Text?: string
    logoUrl?: string

    // Pricing
    salePrice: number

    // Payment
    paymentMethod: 'cod' | 'online'

    // Shipping
    shippingAddress: {
        flat: string
        building?: string
        street: string
        city: string
        state: string
        pincode: string
    }
}

export async function POST(request: NextRequest) {
    try {
        const payload: DirectOrderPayload = await request.json()

        // Validate required fields
        if (!payload.customerName || !payload.customerPhone || !payload.customerEmail) {
            return NextResponse.json(
                { error: 'Customer name, phone, and email are required' },
                { status: 400 }
            )
        }

        if (!payload.line1Text) {
            return NextResponse.json(
                { error: 'Name for card (Line 1) is required' },
                { status: 400 }
            )
        }

        if (!payload.shippingAddress?.city || !payload.shippingAddress?.pincode) {
            return NextResponse.json(
                { error: 'City and pincode are required for shipping' },
                { status: 400 }
            )
        }

        // Validate phone number (Indian mobile: 10 digits)
        const phoneRegex = /^[6-9]\d{9}$/
        const cleanPhone = payload.customerPhone.replace(/\D/g, '').slice(-10)
        if (!phoneRegex.test(cleanPhone)) {
            return NextResponse.json(
                { error: 'Please enter a valid 10-digit mobile number' },
                { status: 400 }
            )
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(payload.customerEmail)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            )
        }

        // Validate pincode (Indian: 6 digits)
        const pincodeRegex = /^\d{6}$/
        if (!pincodeRegex.test(payload.shippingAddress.pincode)) {
            return NextResponse.json(
                { error: 'Please enter a valid 6-digit pincode' },
                { status: 400 }
            )
        }

        // Use admin client to bypass RLS (public form submission)
        const supabase = createAdminClient()

        // Get card design - we need a valid card_design_id for the order
        // First try to find one, or create a default
        let cardDesignId: string | null = null
        let mspAtOrder = payload.salePrice

        const { data: cardDesigns, error: designError } = await supabase
            .from('card_designs')
            .select('id, base_msp')
            .eq('status', 'active')
            .limit(1)

        if (designError) {
            console.error('Error fetching card designs:', designError)
        }

        if (cardDesigns && cardDesigns.length > 0) {
            cardDesignId = cardDesigns[0].id
            mspAtOrder = cardDesigns[0].base_msp
        } else {
            // Create a default card design if none exist
            const { data: newDesign, error: createError } = await supabase
                .from('card_designs')
                .insert({
                    name: 'Default Template',
                    description: 'Default card design',
                    base_msp: 599,
                    status: 'active'
                })
                .select('id, base_msp')
                .single()

            if (createError) {
                console.error('Error creating default card design:', createError)
                return NextResponse.json(
                    { error: 'System configuration error. Please contact support.' },
                    { status: 500 }
                )
            }

            cardDesignId = newDesign.id
            mspAtOrder = newDesign.base_msp
        }

        // Create the order
        const orderData = {
            // Customer details
            customer_name: payload.customerName.trim(),
            customer_company: null, // Can be added later
            customer_phone: cleanPhone,
            customer_email: payload.customerEmail.trim().toLowerCase(),
            customer_whatsapp: payload.customerWhatsapp?.replace(/\D/g, '').slice(-10) || cleanPhone,
            customer_photo_url: payload.logoUrl || null,

            // Card details
            card_design_id: cardDesignId,
            line1_text: payload.line1Text.toUpperCase(),
            line2_text: payload.line2Text || null,

            // Pricing
            msp_at_order: mspAtOrder,
            sale_price: payload.salePrice,
            commission_amount: 0, // No commission for direct orders

            // Status
            status: 'pending_approval',
            payment_status: payload.paymentMethod === 'cod' ? 'cod' : 'pending',

            // Flags
            is_direct_sale: true,
            is_below_msp: false,

            // Shipping
            shipping_address: {
                flat: payload.shippingAddress.flat,
                building: payload.shippingAddress.building || '',
                street: payload.shippingAddress.street,
                city: payload.shippingAddress.city,
                state: payload.shippingAddress.state || '',
                pincode: payload.shippingAddress.pincode
            },

            // Notes
            special_instructions: `Material: ${payload.material.toUpperCase()}, Template: ${payload.templateName || payload.templateId}`
        }

        const { data: order, error } = await supabase
            .from('orders')
            .insert(orderData)
            .select('id, order_number')
            .single()

        if (error) {
            console.error('Error creating order:', error)
            console.error('Order data attempted:', JSON.stringify(orderData, null, 2))
            return NextResponse.json(
                { error: `Failed to create order: ${error.message}` },
                { status: 500 }
            )
        }

        if (!order) {
            console.error('Order created but no data returned')
            return NextResponse.json(
                { error: 'Order created but confirmation failed' },
                { status: 500 }
            )
        }

        // Send order confirmation email (don't block on this)
        const materialNames = {
            metal: 'Matte Black Metal',
            pvc: 'Premium PVC',
            wood: 'Eco Walnut'
        }

        const emailData = getOrderConfirmationEmail({
            customerName: payload.customerName,
            orderNumber: order.order_number,
            materialName: materialNames[payload.material] || payload.material,
            cardName: payload.templateName || 'Custom Design',
            total: payload.salePrice,
            paymentMethod: payload.paymentMethod
        })

        // Fire and forget - don't wait for email to complete
        sendEmail({
            to: { email: payload.customerEmail, name: payload.customerName },
            subject: emailData.subject,
            htmlContent: emailData.html,
            tags: ['order-confirmation']
        }).catch(err => console.error('Failed to send confirmation email:', err))

        // Return success with order details
        return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.order_number,
            message: 'Order placed successfully!'
        })

    } catch (error) {
        console.error('Order submission error:', error)
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        )
    }
}
