/**
 * @file Admin Finance Page
 * @description Financial dashboard with revenue, expenses, and profit tracking
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useMemo } from 'react'
import { RevenueCard } from '@/components/admin/finance/RevenueCard'
import { ExpenseBreakdown, ExpenseCategory } from '@/components/admin/finance/ExpenseBreakdown'
import { AddExpenseModal } from '@/components/admin/finance/AddExpenseModal'
import { CommissionLiabilities } from '@/components/admin/finance/CommissionLiabilities'
import { CodPendingPayments } from '@/components/admin/finance/CodPendingPayments'
import { ProfitSummary } from '@/components/admin/finance/ProfitSummary'
import { PayoutModal } from '@/components/admin/PayoutModal'
import { Agent, CommissionLiability, PayoutPayload } from '@/types/agent'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IndianRupee, TrendingUp, Users, Package } from 'lucide-react'

// Mock Data - will be replaced with Supabase queries
const mockRevenueData = {
    today: 4500,
    todayPrevious: 3200,
    week: 32500,
    weekPrevious: 28000,
    month: 125000,
    monthPrevious: 98000,
    allTime: 485000,
    agentSales: 380000,
    directSales: 105000
}

const mockExpenses = [
    { category: 'printing' as ExpenseCategory, amount: 18500, count: 42 },
    { category: 'shipping' as ExpenseCategory, amount: 8200, count: 65 },
    { category: 'agent_commission' as ExpenseCategory, amount: 35000, count: 88 },
    { category: 'marketing' as ExpenseCategory, amount: 15000, count: 5 },
    { category: 'other' as ExpenseCategory, amount: 3500, count: 8 }
]

const mockLiabilities: CommissionLiability[] = [
    { agentId: '1', fullName: 'Prince Yadav', availableBalance: 5500, lastPayoutDate: new Date(Date.now() - 86400000 * 7).toISOString() },
    { agentId: '2', fullName: 'Rahul Sharma', availableBalance: 3200, lastPayoutDate: new Date(Date.now() - 86400000 * 20).toISOString() },
    { agentId: '4', fullName: 'Amit Kumar', availableBalance: 1500, lastPayoutDate: undefined }
]

const mockAgents: Agent[] = [
    {
        id: '1', profileId: 'p1', fullName: 'Prince Yadav', email: 'prince@example.com',
        phone: '+91 98765 43210', referralCode: 'PRINCE10', upiId: 'prince@upi',
        baseCommission: 100, totalSales: 45, totalEarnings: 22500, availableBalance: 5500,
        status: 'active', createdAt: '', updatedAt: ''
    },
    {
        id: '2', profileId: 'p2', fullName: 'Rahul Sharma', email: 'rahul@example.com',
        phone: '+91 87654 32109', referralCode: 'RAHUL20', bankAccount: '00001234',
        bankIfsc: 'HDFC0001234', baseCommission: 100, totalSales: 28, totalEarnings: 14000,
        availableBalance: 3200, status: 'active', createdAt: '', updatedAt: ''
    }
]

const mockCodOrders = [
    { orderId: '1', orderNumber: 12045, customerName: 'Vikram Patel', customerPhone: '+91 98765 11111', amount: 850, daysPending: 5 },
    { orderId: '2', orderNumber: 12042, customerName: 'Neha Gupta', customerPhone: '+91 98765 22222', amount: 750, daysPending: 8 },
    { orderId: '3', orderNumber: 12038, customerName: 'Sanjay Mehta', customerPhone: '+91 98765 33333', amount: 900, daysPending: 12 }
]

export default function AdminFinancePage() {
    const [expenses, setExpenses] = useState(mockExpenses)
    const [liabilities, setLiabilities] = useState(mockLiabilities)
    const [addExpenseOpen, setAddExpenseOpen] = useState(false)
    const [payoutModalOpen, setPayoutModalOpen] = useState(false)
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

    const totalExpenses = useMemo(() =>
        expenses.reduce((sum, e) => sum + e.amount, 0),
        [expenses]
    )

    const totalOwed = useMemo(() =>
        liabilities.reduce((sum, l) => sum + l.availableBalance, 0),
        [liabilities]
    )

    const totalCodPending = mockCodOrders.reduce((sum, o) => sum + o.amount, 0)

    const handleAddExpense = async (data: {
        category: ExpenseCategory
        amount: number
        description: string
        date: string
    }) => {
        setExpenses(prev => prev.map(e =>
            e.category === data.category
                ? { ...e, amount: e.amount + data.amount, count: e.count + 1 }
                : e
        ))
    }

    const handlePayAgent = (agentId: string) => {
        const agent = mockAgents.find(a => a.id === agentId)
        if (agent) {
            setSelectedAgent(agent)
            setPayoutModalOpen(true)
        }
    }

    const handlePayout = async (agentId: string, data: PayoutPayload) => {
        setLiabilities(prev => prev.map(l =>
            l.agentId === agentId
                ? { ...l, availableBalance: l.availableBalance - data.amount }
                : l
        ).filter(l => l.availableBalance > 0))

        // Add to expenses
        setExpenses(prev => prev.map(e =>
            e.category === 'agent_commission'
                ? { ...e, amount: e.amount + data.amount, count: e.count + 1 }
                : e
        ))
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 overflow-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight">Finance</h1>
                <p className="text-muted-foreground">
                    Track revenue, expenses, and profitability
                </p>
            </div>

            {/* Revenue Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <RevenueCard
                    title="Today"
                    amount={mockRevenueData.today}
                    previousAmount={mockRevenueData.todayPrevious}
                />
                <RevenueCard
                    title="This Week"
                    amount={mockRevenueData.week}
                    previousAmount={mockRevenueData.weekPrevious}
                />
                <RevenueCard
                    title="This Month"
                    amount={mockRevenueData.month}
                    previousAmount={mockRevenueData.monthPrevious}
                    highlight
                />
                <RevenueCard
                    title="All Time"
                    amount={mockRevenueData.allTime}
                    icon="trend"
                />
            </div>

            {/* Sales Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Agent Sales</span>
                    </div>
                    <p className="text-2xl font-bold">₹{(mockRevenueData.agentSales / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {((mockRevenueData.agentSales / mockRevenueData.allTime) * 100).toFixed(0)}% of total
                    </p>
                </div>
                <div className="p-4 rounded-xl border bg-white">
                    <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Direct Sales</span>
                    </div>
                    <p className="text-2xl font-bold">₹{(mockRevenueData.directSales / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {((mockRevenueData.directSales / mockRevenueData.allTime) * 100).toFixed(0)}% of total
                    </p>
                </div>
            </div>

            {/* Main Content - Tabs */}
            <Tabs defaultValue="overview" className="flex-1">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="commissions">Commissions</TabsTrigger>
                    <TabsTrigger value="cod">COD Payments</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <ExpenseBreakdown
                            expenses={expenses}
                            totalExpenses={totalExpenses}
                            onAddExpense={() => setAddExpenseOpen(true)}
                        />
                        <ProfitSummary
                            totalRevenue={mockRevenueData.month}
                            totalExpenses={totalExpenses}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="commissions" className="mt-4">
                    <CommissionLiabilities
                        liabilities={liabilities}
                        totalOwed={totalOwed}
                        onPayAgent={handlePayAgent}
                    />
                </TabsContent>

                <TabsContent value="cod" className="mt-4">
                    <CodPendingPayments
                        orders={mockCodOrders}
                        totalAmount={totalCodPending}
                    />
                </TabsContent>
            </Tabs>

            {/* Modals */}
            <AddExpenseModal
                open={addExpenseOpen}
                onOpenChange={setAddExpenseOpen}
                onSubmit={handleAddExpense}
            />

            <PayoutModal
                agent={selectedAgent}
                open={payoutModalOpen}
                onOpenChange={setPayoutModalOpen}
                onSubmit={handlePayout}
            />
        </div>
    )
}
