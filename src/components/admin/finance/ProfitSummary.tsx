/**
 * @file Profit Summary Component
 * @description Gross profit and margin calculation display
 * 
 * @owner Dev 1
 */

'use client'

import { TrendingUp, TrendingDown, MinusCircle } from 'lucide-react'

interface ProfitSummaryProps {
    totalRevenue: number
    totalExpenses: number
}

function formatCurrency(amount: number): string {
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)}L`
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export function ProfitSummary({ totalRevenue, totalExpenses }: ProfitSummaryProps) {
    const grossProfit = totalRevenue - totalExpenses
    const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0
    const isPositive = grossProfit > 0
    const isNeutral = grossProfit === 0

    return (
        <div className={`p-6 rounded-xl border ${isPositive ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' :
                isNeutral ? 'bg-gray-50 border-gray-200' :
                    'bg-gradient-to-br from-red-50 to-orange-100 border-red-200'
            }`}>
            <div className="flex items-center gap-2 mb-4">
                {isPositive ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                ) : isNeutral ? (
                    <MinusCircle className="w-5 h-5 text-gray-500" />
                ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                )}
                <h3 className="font-semibold">Profit Summary</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-lg font-bold text-green-700">{formatCurrency(totalRevenue)}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Expenses</p>
                    <p className="text-lg font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Gross Profit</p>
                    <p className={`text-lg font-bold ${isPositive ? 'text-green-700' : isNeutral ? 'text-gray-500' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{formatCurrency(grossProfit)}
                    </p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-current/10">
                <div className="flex items-center justify-between">
                    <span className="text-sm">Profit Margin</span>
                    <span className={`text-2xl font-bold ${isPositive ? 'text-green-700' : isNeutral ? 'text-gray-500' : 'text-red-600'}`}>
                        {profitMargin.toFixed(1)}%
                    </span>
                </div>
                <div className="mt-2 h-3 bg-white/50 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(Math.abs(profitMargin), 100)}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
