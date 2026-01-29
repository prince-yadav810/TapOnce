/**
 * Seed Orders Script
 * Run with: npx tsx scripts/seed-orders.ts
 * 
 * This script seeds dummy orders for testing the Order Board.
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables!')
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
}

// Use service role key to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const cardDesigns = [
    { id: 'cd111111-1111-1111-1111-111111111111', name: 'Vertical Blue Premium', baseMsp: 600, previewUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400' },
    { id: 'cd222222-2222-2222-2222-222222222222', name: 'Horizontal Gold Elite', baseMsp: 800, previewUrl: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=600' },
    { id: 'cd333333-3333-3333-3333-333333333333', name: 'Minimal White Pro', baseMsp: 550, previewUrl: 'https://images.unsplash.com/photo-1541182388248-95b2e42f9eee?w=400' },
    { id: 'cd444444-4444-4444-4444-444444444444', name: 'Dark Mode Executive', baseMsp: 700, previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400' },
]

const dummyOrders = [
    // Pending Approval
    {
        id: '10000001-0001-0001-0001-000000000001',
        customer_name: 'Rajesh Kumar',
        customer_company: 'TechStart India',
        customer_phone: '+919876543201',
        customer_email: 'rajesh@techstart.in',
        card_design_id: 'cd111111-1111-1111-1111-111111111111',
        line1_text: 'RAJESH KUMAR',
        line2_text: 'CEO & Founder',
        msp_at_order: 600,
        sale_price: 850,
        commission_amount: 200,
        override_commission: 0,
        status: 'pending_approval',
        payment_status: 'pending',
        is_direct_sale: true,
        is_below_msp: false,
    },
    {
        id: '10000001-0001-0001-0001-000000000002',
        customer_name: 'Priya Sharma',
        customer_company: 'Design Hub',
        customer_phone: '+919876543202',
        customer_email: 'priya@designhub.com',
        card_design_id: 'cd222222-2222-2222-2222-222222222222',
        line1_text: 'PRIYA SHARMA',
        line2_text: 'Creative Director',
        msp_at_order: 800,
        sale_price: 950,
        commission_amount: 150,
        override_commission: 0,
        status: 'pending_approval',
        payment_status: 'advance_paid',
        is_direct_sale: true,
        is_below_msp: false,
    },
    // Approved
    {
        id: '10000001-0001-0001-0001-000000000003',
        customer_name: 'Amit Patel',
        customer_company: 'Global Solutions',
        customer_phone: '+919876543203',
        customer_email: 'amit@global.co',
        card_design_id: 'cd333333-3333-3333-3333-333333333333',
        line1_text: 'AMIT PATEL',
        line2_text: 'Managing Partner',
        msp_at_order: 550,
        sale_price: 750,
        commission_amount: 175,
        override_commission: 0,
        status: 'approved',
        payment_status: 'paid',
        is_direct_sale: true,
        is_below_msp: false,
    },
    // Printing
    {
        id: '10000001-0001-0001-0001-000000000004',
        customer_name: 'Sneha Reddy',
        customer_company: 'Influencer Co',
        customer_phone: '+919876543204',
        customer_email: 'sneha@influencer.co',
        card_design_id: 'cd444444-4444-4444-4444-444444444444',
        line1_text: 'SNEHA REDDY',
        line2_text: 'Content Creator',
        msp_at_order: 700,
        sale_price: 900,
        commission_amount: 200,
        override_commission: 0,
        status: 'printing',
        payment_status: 'paid',
        is_direct_sale: true,
        is_below_msp: false,
    },
    {
        id: '10000001-0001-0001-0001-000000000005',
        customer_name: 'Vikram Singh',
        customer_company: 'StartupX',
        customer_phone: '+919876543205',
        customer_email: 'vikram@startupx.io',
        card_design_id: 'cd111111-1111-1111-1111-111111111111',
        line1_text: 'VIKRAM SINGH',
        line2_text: 'Co-Founder',
        msp_at_order: 600,
        sale_price: 800,
        commission_amount: 180,
        override_commission: 0,
        status: 'printing',
        payment_status: 'paid',
        is_direct_sale: true,
        is_below_msp: false,
    },
    // Ready to Ship
    {
        id: '10000001-0001-0001-0001-000000000006',
        customer_name: 'Meera Joshi',
        customer_company: 'Finance Pro',
        customer_phone: '+919876543206',
        customer_email: 'meera@financepro.in',
        card_design_id: 'cd222222-2222-2222-2222-222222222222',
        line1_text: 'MEERA JOSHI',
        line2_text: 'Financial Advisor',
        msp_at_order: 800,
        sale_price: 1000,
        commission_amount: 200,
        override_commission: 0,
        status: 'ready_to_ship',
        payment_status: 'paid',
        is_direct_sale: true,
        is_below_msp: false,
    },
    // Shipped
    {
        id: '10000001-0001-0001-0001-000000000007',
        customer_name: 'Arjun Nair',
        customer_company: 'Tech Consulting',
        customer_phone: '+919876543207',
        customer_email: 'arjun@techconsult.com',
        card_design_id: 'cd333333-3333-3333-3333-333333333333',
        line1_text: 'ARJUN NAIR',
        line2_text: 'Tech Consultant',
        msp_at_order: 550,
        sale_price: 700,
        commission_amount: 150,
        override_commission: 0,
        status: 'shipped',
        payment_status: 'paid',
        is_direct_sale: true,
        is_below_msp: false,
    },
    // Delivered
    {
        id: '10000001-0001-0001-0001-000000000008',
        customer_name: 'Kavita Menon',
        customer_company: 'Legal Eagles',
        customer_phone: '+919876543208',
        customer_email: 'kavita@legaleagles.in',
        card_design_id: 'cd444444-4444-4444-4444-444444444444',
        line1_text: 'KAVITA MENON',
        line2_text: 'Senior Advocate',
        msp_at_order: 700,
        sale_price: 950,
        commission_amount: 225,
        override_commission: 0,
        status: 'delivered',
        payment_status: 'cod',
        is_direct_sale: true,
        is_below_msp: false,
    },
]

async function seedCardDesigns() {
    console.log('🎨 Seeding card designs...')

    for (const design of cardDesigns) {
        const { error } = await supabase
            .from('card_designs')
            .upsert({
                id: design.id,
                name: design.name,
                description: `${design.name} - Premium NFC business card`,
                base_msp: design.baseMsp,
                preview_url: design.previewUrl,
                status: 'active',
                total_sales: 0
            }, { onConflict: 'id' })

        if (error) {
            console.error(`Failed to insert design ${design.name}:`, error.message)
        } else {
            console.log(`  ✓ ${design.name}`)
        }
    }
}

async function seedOrders() {
    console.log('\n📦 Seeding orders...')

    for (const order of dummyOrders) {
        const { error } = await supabase
            .from('orders')
            .upsert(order, { onConflict: 'id' })

        if (error) {
            console.error(`Failed to insert order for ${order.customer_name}:`, error.message)
        } else {
            console.log(`  ✓ ${order.customer_name} (${order.status})`)
        }
    }
}

async function main() {
    console.log('🚀 Starting seed process...\n')

    await seedCardDesigns()
    await seedOrders()

    console.log('\n✅ Seed complete!')
    console.log('Refresh your admin orders page to see the dummy data.')
}

main().catch(console.error)
