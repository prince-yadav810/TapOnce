/**
 * @file Revenue Card Component
 * @description Stats card showing revenue with time period
 * 
 * @owner Dev 1
 */

'use client'

import { ArrowUpRight, ArrowDownRight, TrendingUp, IndianRupee } from 'lucide-react'

interface RevenueCardProps {
    title: string
    amount: number
    previousAmount?: number
    icon?: 'revenue' | 'trend'
    highlight?: boolean
}

function formatCurrency(amount: number): string {
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)}L`
    }
    if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(1)}K`
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export function RevenueCard({
    title,
    amount,
    previousAmount,
    icon = 'revenue',
    highlight = false
}: RevenueCardProps) {
    const change = previousAmount ? ((amount - previousAmount) / previousAmount) * 100 : 0
    const isPositive = change >= 0

    return (
        <div className={`p-4 rounded-xl border ${highlight ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{title}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${highlight ? 'bg-green-100' : 'bg-muted'}`}>
                    {icon === 'revenue' ? (
                        <IndianRupee className={`w-4 h-4 ${highlight ? 'text-green-600' : 'text-muted-foreground'}`} />
                    ) : (
                        <TrendingUp className={`w-4 h-4 ${highlight ? 'text-green-600' : 'text-muted-foreground'}`} />
                    )}
                </div>
            </div>
            <p className={`text-2xl font-bold ${highlight ? 'text-green-700' : ''}`}>
                {formatCurrency(amount)}
            </p>
            {previousAmount !== undefined && (
                <div className="flex items-center gap-1 mt-1">
                    {isPositive ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.abs(change).toFixed(1)}%
                    </span>
                    <span className="text-xs text-muted-foreground">vs previous</span>
                </div>
            )}
        </div>
    )
}
