/**
 * @file Agent Application API Route
 * @description Handles agent recruitment applications
 * 
 * @owner Dev 1
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { sendEmail, getAgentApplicationEmail } from '@/lib/email/brevo'
import { NextRequest, NextResponse } from 'next/server'

interface AgentApplicationPayload {
    fullName: string
    phone: string
    email: string
    city: string
    experience?: string
    referralCode?: string // If referred by another agent
}

export async function POST(request: NextRequest) {
    try {
        const payload: AgentApplicationPayload = await request.json()

        // Validate required fields
        if (!payload.fullName || !payload.phone || !payload.email || !payload.city) {
            return NextResponse.json(
                { error: 'Name, phone, email, and city are required' },
                { status: 400 }
            )
        }

        // Validate phone number (Indian mobile: 10 digits)
        const phoneRegex = /^[6-9]\d{9}$/
        const cleanPhone = payload.phone.replace(/\D/g, '').slice(-10)
        if (!phoneRegex.test(cleanPhone)) {
            return NextResponse.json(
                { error: 'Please enter a valid 10-digit mobile number' },
                { status: 400 }
            )
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(payload.email)) {
            return NextResponse.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            )
        }

        // Use admin client to bypass RLS for public form
        const supabase = createAdminClient()

        // Check if an application with this email/phone already exists
        const { data: existingApp } = await supabase
            .from('agent_applications')
            .select('id, status')
            .or(`email.eq.${payload.email.toLowerCase()},phone.eq.${cleanPhone}`)
            .limit(1)
            .single()

        if (existingApp) {
            const statusMessage = existingApp.status === 'pending'
                ? 'Your application is already under review.'
                : 'You have already applied. Please contact support.'
            return NextResponse.json(
                { error: statusMessage },
                { status: 400 }
            )
        }

        // Check if they're already an agent
        const { data: existingAgent } = await supabase
            .from('agents')
            .select('id')
            .or(`upi_id.ilike.%${payload.email}%`)
            .limit(1)

        // Check profiles for existing phone
        const { data: existingProfile } = await supabase
            .from('profiles')
            .select('id')
            .eq('phone', cleanPhone)
            .limit(1)

        if (existingProfile && existingProfile.length > 0) {
            return NextResponse.json(
                { error: 'An account with this phone number already exists. Please login.' },
                { status: 400 }
            )
        }

        // Find parent agent if referral code provided
        let parentAgentId = null
        if (payload.referralCode) {
            const { data: parentAgent } = await supabase
                .from('agents')
                .select('id')
                .eq('referral_code', payload.referralCode.toUpperCase())
                .single()

            if (parentAgent) {
                parentAgentId = parentAgent.id
            }
        }

        // Generate a unique referral code for the new agent
        const generateReferralCode = (name: string) => {
            const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 6)
            const randomNum = Math.floor(Math.random() * 100)
            return `${cleanName}${randomNum}`
        }

        const referralCode = generateReferralCode(payload.fullName)

        // Insert into agent_applications table
        const { data: application, error } = await supabase
            .from('agent_applications')
            .insert({
                full_name: payload.fullName.trim(),
                email: payload.email.trim().toLowerCase(),
                phone: cleanPhone,
                city: payload.city.trim(),
                experience: payload.experience || null,
                referral_code_used: payload.referralCode?.toUpperCase() || null,
                parent_agent_id: parentAgentId,
                generated_referral_code: referralCode,
                status: 'pending'
            })
            .select('id')
            .single()

        if (error) {
            console.error('Error creating application:', error)
            return NextResponse.json(
                { error: `Failed to submit application: ${error.message}` },
                { status: 500 }
            )
        }

        console.log('New agent application created:', application.id)

        // Send confirmation email to applicant
        const emailData = getAgentApplicationEmail({
            agentName: payload.fullName
        })

        sendEmail({
            to: { email: payload.email, name: payload.fullName },
            subject: emailData.subject,
            htmlContent: emailData.html,
            tags: ['agent-application']
        }).catch(err => console.error('Failed to send application email:', err))

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully! Our team will review and contact you within 48 hours.',
            applicationId: application.id
        })

    } catch (error) {
        console.error('Agent application error:', error)
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        )
    }
}
