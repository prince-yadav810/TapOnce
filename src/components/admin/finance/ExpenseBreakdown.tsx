/**
 * @file Expense Breakdown Component
 * @description Expense list by category with visual progress bars
 * 
 * @owner Dev 1
 */

'use client'

import { Button } from '@/components/ui/button'
import { Plus, Printer, Truck, Users, Megaphone, MoreHorizontal } from 'lucide-react'

export type ExpenseCategory = 'printing' | 'shipping' | 'agent_commission' | 'marketing' | 'other'

interface ExpenseItem {
    category: ExpenseCategory
    amount: number
    count: number
}

interface ExpenseBreakdownProps {
    expenses: ExpenseItem[]
    totalExpenses: number
    onAddExpense: () => void
}

const categoryConfig: Record<ExpenseCategory, { label: string; icon: typeof Printer; color: string }> = {
    printing: { label: 'Card Printing', icon: Printer, color: 'bg-blue-500' },
    shipping: { label: 'Shipping', icon: Truck, color: 'bg-purple-500' },
    agent_commission: { label: 'Agent Commission', icon: Users, color: 'bg-green-500' },
    marketing: { label: 'Marketing', icon: Megaphone, color: 'bg-orange-500' },
    other: { label: 'Other', icon: MoreHorizontal, color: 'bg-gray-500' }
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export function ExpenseBreakdown({
    expenses,
    totalExpenses,
    onAddExpense
}: ExpenseBreakdownProps) {
    const maxAmount = Math.max(...expenses.map(e => e.amount), 1)

    return (
        <div className="p-4 rounded-xl border bg-white">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-semibold">Expense Breakdown</h3>
                    <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <Button size="sm" variant="outline" onClick={onAddExpense}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                </Button>
            </div>

            <div className="space-y-3">
                {expenses.map((expense) => {
                    const config = categoryConfig[expense.category]
                    const percentage = (expense.amount / maxAmount) * 100

                    return (
                        <div key={expense.category} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <config.icon className="w-4 h-4 text-muted-foreground" />
                                    <span>{config.label}</span>
                                    <span className="text-xs text-muted-foreground">
                                        ({expense.count})
                                    </span>
                                </div>
                                <span className="font-medium">{formatCurrency(expense.amount)}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${config.color} rounded-full transition-all`}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between">
                <span className="font-medium">Total Expenses</span>
                <span className="font-bold text-red-600">{formatCurrency(totalExpenses)}</span>
            </div>
        </div>
    )
}
