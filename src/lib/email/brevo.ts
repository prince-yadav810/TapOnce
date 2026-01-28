/**
 * @file Brevo Email Service
 * @description Email service using Brevo (formerly Sendinblue) for transactional emails
 * 
 * @owner Dev 1
 * 
 * Environment Variables Required:
 * - BREVO_API_KEY: Your Brevo API key
 * - EMAIL_FROM_NAME: Sender name (default: TapOnce)
 * - EMAIL_FROM_ADDRESS: Sender email (default: noreply@taponce.in)
 */

interface EmailRecipient {
    email: string
    name?: string
}

interface SendEmailOptions {
    to: EmailRecipient | EmailRecipient[]
    subject: string
    htmlContent: string
    textContent?: string
    replyTo?: EmailRecipient
    tags?: string[]
}

interface BrevoResponse {
    messageId?: string
    error?: string
}

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email'

/**
 * Send an email using Brevo API
 */
export async function sendEmail(options: SendEmailOptions): Promise<BrevoResponse> {
    const apiKey = process.env.BREVO_API_KEY

    if (!apiKey) {
        console.error('BREVO_API_KEY is not configured')
        return { error: 'Email service not configured' }
    }

    const fromName = process.env.EMAIL_FROM_NAME || 'TapOnce'
    const fromEmail = process.env.EMAIL_FROM_ADDRESS || 'noreply@taponce.in'

    const recipients = Array.isArray(options.to) ? options.to : [options.to]

    const payload = {
        sender: {
            name: fromName,
            email: fromEmail
        },
        to: recipients,
        subject: options.subject,
        htmlContent: options.htmlContent,
        textContent: options.textContent,
        replyTo: options.replyTo,
        tags: options.tags
    }

    try {
        const response = await fetch(BREVO_API_URL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': apiKey,
                'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('Brevo API error:', data)
            return { error: data.message || 'Failed to send email' }
        }

        return { messageId: data.messageId }
    } catch (error) {
        console.error('Email sending error:', error)
        return { error: 'Failed to send email' }
    }
}

// =====================================================
// EMAIL TEMPLATES
// =====================================================

/**
 * Order Confirmation Email
 */
export function getOrderConfirmationEmail(params: {
    customerName: string
    orderNumber: number
    materialName: string
    cardName: string
    total: number
    paymentMethod: 'cod' | 'online'
}): { subject: string; html: string } {
    const { customerName, orderNumber, materialName, cardName, total, paymentMethod } = params

    return {
        subject: `Order Confirmed #${orderNumber} - Your Smart Card is Being Prepared!`,
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border-radius: 16px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 32px; text-align: center;">
                            <h1 style="margin: 0; color: white; font-size: 24px; font-weight: bold;">TapOnce</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 32px;">
                            <h2 style="color: #22c55e; font-size: 28px; margin: 0 0 16px 0; text-align: center;">🎉 Order Confirmed!</h2>
                            
                            <p style="color: #a1a1aa; font-size: 16px; margin: 0 0 24px 0; text-align: center;">
                                Hi ${customerName}, thank you for your order!
                            </p>
                            
                            <!-- Order Details Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="color: #71717a; font-size: 14px; padding-bottom: 12px;">Order Number</td>
                                                <td style="color: white; font-size: 14px; text-align: right; padding-bottom: 12px; font-weight: bold;">#${orderNumber}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #71717a; font-size: 14px; padding-bottom: 12px;">Card Type</td>
                                                <td style="color: white; font-size: 14px; text-align: right; padding-bottom: 12px;">${materialName}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #71717a; font-size: 14px; padding-bottom: 12px;">Template</td>
                                                <td style="color: white; font-size: 14px; text-align: right; padding-bottom: 12px;">${cardName}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #71717a; font-size: 14px; padding-bottom: 12px;">Payment</td>
                                                <td style="color: white; font-size: 14px; text-align: right; padding-bottom: 12px;">
                                                    ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="border-top: 1px solid #333; padding-top: 12px;"></td>
                                            </tr>
                                            <tr>
                                                <td style="color: white; font-size: 18px; font-weight: bold;">Total</td>
                                                <td style="color: #a855f7; font-size: 18px; font-weight: bold; text-align: right;">₹${total}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- What's Next -->
                            <h3 style="color: white; font-size: 16px; margin: 24px 0 16px 0;">What happens next?</h3>
                            <ul style="color: #a1a1aa; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
                                <li>We'll review your order within 24 hours</li>
                                <li>You'll receive your login credentials via email</li>
                                <li>Your card will be delivered in 5-7 business days</li>
                            </ul>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0a0a0a; padding: 24px 32px; text-align: center; border-top: 1px solid #222;">
                            <p style="color: #71717a; font-size: 12px; margin: 0 0 8px 0;">
                                Questions? Reply to this email or WhatsApp us at +91 98765 43210
                            </p>
                            <p style="color: #52525b; font-size: 11px; margin: 0;">
                                © 2026 TapOnce. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `.trim()
    }
}

/**
 * Customer Welcome Email (with credentials)
 */
export function getCustomerWelcomeEmail(params: {
    customerName: string
    orderNumber: number
    profileUrl: string
    loginUrl: string
    username: string
    password: string
}): { subject: string; html: string } {
    const { customerName, orderNumber, profileUrl, loginUrl, username, password } = params

    return {
        subject: `Your Smart Card Login Details - Order #${orderNumber}`,
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border-radius: 16px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 32px; text-align: center;">
                            <h1 style="margin: 0; color: white; font-size: 24px; font-weight: bold;">TapOnce</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 32px;">
                            <h2 style="color: white; font-size: 24px; margin: 0 0 16px 0;">Welcome, ${customerName}! 🎉</h2>
                            
                            <p style="color: #a1a1aa; font-size: 16px; margin: 0 0 24px 0;">
                                Your smart card order (#${orderNumber}) has been confirmed and your profile is now live!
                            </p>
                            
                            <!-- Profile URL -->
                            <div style="background: linear-gradient(135deg, #7c3aed20 0%, #a855f720 100%); border: 1px solid #7c3aed40; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
                                <p style="color: #a1a1aa; font-size: 14px; margin: 0 0 8px 0;">Your Profile URL</p>
                                <a href="${profileUrl}" style="color: #a855f7; font-size: 18px; font-weight: bold; text-decoration: none;">
                                    ${profileUrl}
                                </a>
                            </div>
                            
                            <!-- Credentials -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; margin-bottom: 24px;">
                                <tr>
                                    <td style="padding: 24px;">
                                        <h3 style="color: white; font-size: 16px; margin: 0 0 16px 0;">Your Login Credentials</h3>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="color: #71717a; font-size: 14px; padding-bottom: 8px;">Username</td>
                                                <td style="color: white; font-size: 14px; text-align: right; padding-bottom: 8px; font-family: monospace;">${username}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #71717a; font-size: 14px;">Password</td>
                                                <td style="color: white; font-size: 14px; text-align: right; font-family: monospace;">${password}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="${loginUrl}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white; padding: 16px 32px; border-radius: 99px; text-decoration: none; font-weight: bold; font-size: 16px;">
                                            Edit Your Profile →
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Info -->
                            <p style="color: #71717a; font-size: 13px; margin: 24px 0 0 0; text-align: center;">
                                Your card will be delivered within 7 days. Once it arrives, tap it on any smartphone to share your profile instantly!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0a0a0a; padding: 24px 32px; text-align: center; border-top: 1px solid #222;">
                            <p style="color: #71717a; font-size: 12px; margin: 0 0 8px 0;">
                                Questions? Reply to this email or WhatsApp us at +91 98765 43210
                            </p>
                            <p style="color: #52525b; font-size: 11px; margin: 0;">
                                © 2026 TapOnce. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `.trim()
    }
}

/**
 * Agent Application Received Email
 */
export function getAgentApplicationEmail(params: {
    agentName: string
}): { subject: string; html: string } {
    const { agentName } = params

    return {
        subject: 'Application Received - TapOnce Agent Program',
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border-radius: 16px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); padding: 32px; text-align: center;">
                            <h1 style="margin: 0; color: white; font-size: 24px; font-weight: bold;">TapOnce</h1>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 32px;">
                            <h2 style="color: white; font-size: 24px; margin: 0 0 16px 0;">Application Received! 📋</h2>
                            
                            <p style="color: #a1a1aa; font-size: 16px; margin: 0 0 24px 0;">
                                Hi ${agentName}, thank you for applying to become a TapOnce Agent!
                            </p>
                            
                            <p style="color: #a1a1aa; font-size: 16px; margin: 0 0 24px 0;">
                                Our team is reviewing your application and will contact you within 48 hours. Here's what to expect:
                            </p>
                            
                            <ul style="color: #a1a1aa; font-size: 14px; margin: 0 0 24px 0; padding-left: 20px; line-height: 1.8;">
                                <li>We'll review your application details</li>
                                <li>You'll receive a call or WhatsApp message for a brief chat</li>
                                <li>Once approved, you'll get your agent login credentials</li>
                                <li>Start selling and earning commissions immediately!</li>
                            </ul>
                            
                            <p style="color: #71717a; font-size: 13px; margin: 0; text-align: center;">
                                In the meantime, feel free to check out our website to learn more about our products.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0a0a0a; padding: 24px 32px; text-align: center; border-top: 1px solid #222;">
                            <p style="color: #71717a; font-size: 12px; margin: 0 0 8px 0;">
                                Questions? Contact us at +91 98765 43210
                            </p>
                            <p style="color: #52525b; font-size: 11px; margin: 0;">
                                © 2026 TapOnce. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `.trim()
    }
}
