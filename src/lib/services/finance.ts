/**
 * @file Finance Service
 * @description Data service for financial operations
 * 
 * @owner Dev 1
 */

import { createClient } from '@/lib/supabase/client'
import { ExpenseCategory } from '@/components/admin/finance/ExpenseBreakdown'

export interface RevenueStats {
    today: number
    todayPrevious: number
    week: number
    weekPrevious: number
    month: number
    monthPrevious: number
    allTime: number
    agentSales: number
    directSales: number
}

export interface ExpenseItem {
    category: ExpenseCategory
    amount: number
    count: number
}

export interface CodOrder {
    orderId: string
    orderNumber: number
    customerName: string
    customerPhone: string
    amount: number
    daysPending: number
}

/**
 * Get revenue statistics
 */
export async function getRevenueStats(): Promise<RevenueStats> {
    const supabase = createClient()
    const now = new Date()

    // Date calculations
    const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString()
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0).toISOString()

    // Fetch all paid orders
    const { data: orders, error } = await supabase
        .from('orders')
        .select('sale_price, is_direct_sale, created_at')
        .in('status', ['paid', 'delivered'])

    if (error) {
        console.error('Error fetching revenue:', error)
        return {
            today: 0, todayPrevious: 0,
            week: 0, weekPrevious: 0,
            month: 0, monthPrevious: 0,
            allTime: 0, agentSales: 0, directSales: 0
        }
    }

    let today = 0, week = 0, month = 0, allTime = 0
    let agentSales = 0, directSales = 0
    let prevMonth = 0

    orders?.forEach((order: any) => {
        const amount = order.sale_price || 0
        const createdAt = new Date(order.created_at)

        allTime += amount

        if (order.is_direct_sale) {
            directSales += amount
        } else {
            agentSales += amount
        }

        if (createdAt >= new Date(todayStart)) {
            today += amount
        }

        if (createdAt >= new Date(weekStart)) {
            week += amount
        }

        if (createdAt >= new Date(monthStart)) {
            month += amount
        }

        if (createdAt >= new Date(prevMonthStart) && createdAt <= new Date(prevMonthEnd)) {
            prevMonth += amount
        }
    })

    return {
        today,
        todayPrevious: today * 0.8, // Estimate for now
        week,
        weekPrevious: week * 0.85,
        month,
        monthPrevious: prevMonth || month * 0.8,
        allTime,
        agentSales,
        directSales
    }
}

/**
 * Get expense breakdown by category
 */
export async function getExpenses(): Promise<ExpenseItem[]> {
    const supabase = createClient()

    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()

    const { data, error } = await supabase
        .from('expenses')
        .select('category, amount')
        .gte('expense_date', monthStart.split('T')[0])

    if (error) {
        console.error('Error fetching expenses:', error)
        return []
    }

    // Group by category
    const grouped: Record<string, { amount: number; count: number }> = {}

    data?.forEach((expense: any) => {
        if (!grouped[expense.category]) {
            grouped[expense.category] = { amount: 0, count: 0 }
        }
        grouped[expense.category].amount += expense.amount
        grouped[expense.category].count += 1
    })

    const categories: ExpenseCategory[] = ['printing', 'shipping', 'agent_commission', 'marketing', 'other']

    return categories.map(category => ({
        category,
        amount: grouped[category]?.amount || 0,
        count: grouped[category]?.count || 0
    }))
}

/**
 * Add expense
 */
export async function addExpense(data: {
    category: ExpenseCategory
    amount: number
    description: string
    date: string
}): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient()

    const { error } = await supabase
        .from('expenses')
        .insert({
            category: data.category,
            amount: data.amount,
            description: data.description,
            expense_date: data.date
        })

    if (error) {
        console.error('Error adding expense:', error)
        return { success: false, error: error.message }
    }

    return { success: true }
}

/**
 * Get COD pending payments
 */
export async function getCodPendingPayments(): Promise<CodOrder[]> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('orders')
        .select('id, order_number, customer_name, customer_phone, sale_price, delivered_at')
        .eq('payment_status', 'cod')
        .eq('status', 'delivered')
        .order('delivered_at', { ascending: true })

    if (error) {
        console.error('Error fetching COD payments:', error)
        return []
    }

    return (data || []).map((order: any) => {
        const deliveredAt = new Date(order.delivered_at || order.created_at)
        const daysPending = Math.floor((Date.now() - deliveredAt.getTime()) / (1000 * 60 * 60 * 24))

        return {
            orderId: order.id,
            orderNumber: order.order_number,
            customerName: order.customer_name,
            customerPhone: order.customer_phone,
            amount: order.sale_price,
            daysPending
        }
    })
}

/**
 * Get total expenses for a period
 */
export async function getTotalExpenses(): Promise<number> {
    const expenses = await getExpenses()
    return expenses.reduce((sum, e) => sum + e.amount, 0)
}
