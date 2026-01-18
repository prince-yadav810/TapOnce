/**
 * @file Commission Liabilities Component
 * @description List of agents with pending payouts
 * 
 * @owner Dev 1
 */

'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CommissionLiability } from '@/types/agent'
import { Wallet, AlertCircle } from 'lucide-react'

interface CommissionLiabilitiesProps {
    liabilities: CommissionLiability[]
    totalOwed: number
    onPayAgent: (agentId: string) => void
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function CommissionLiabilities({
    liabilities,
    totalOwed,
    onPayAgent
}: CommissionLiabilitiesProps) {
    const pendingLiabilities = liabilities.filter(l => l.availableBalance > 0)

    return (
        <div className="p-4 rounded-xl border bg-white">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-semibold">Commission Liabilities</h3>
                    <p className="text-sm text-muted-foreground">
                        {pendingLiabilities.length} agent{pendingLiabilities.length !== 1 ? 's' : ''} with pending payouts
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Owed</p>
                    <p className="text-xl font-bold text-amber-600">{formatCurrency(totalOwed)}</p>
                </div>
            </div>

            {pendingLiabilities.length === 0 ? (
                <div className="py-8 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Wallet className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-muted-foreground">All commissions paid!</p>
                </div>
            ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {pendingLiabilities.map((liability) => {
                        const daysSinceLastPayout = liability.lastPayoutDate
                            ? Math.floor((Date.now() - new Date(liability.lastPayoutDate).getTime()) / 86400000)
                            : null

                        return (
                            <div
                                key={liability.agentId}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {getInitials(liability.fullName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{liability.fullName}</p>
                                        <div className="flex items-center gap-2">
                                            {daysSinceLastPayout !== null && daysSinceLastPayout > 14 && (
                                                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                                                    <AlertCircle className="w-3 h-3 mr-1" />
                                                    {daysSinceLastPayout}d since payout
                                                </Badge>
                                            )}
                                            {daysSinceLastPayout !== null && daysSinceLastPayout <= 14 && (
                                                <span className="text-xs text-muted-foreground">
                                                    Last paid {daysSinceLastPayout}d ago
                                                </span>
                                            )}
                                            {daysSinceLastPayout === null && (
                                                <span className="text-xs text-muted-foreground">
                                                    Never paid
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-amber-600">
                                        {formatCurrency(liability.availableBalance)}
                                    </span>
                                    <Button
                                        size="sm"
                                        onClick={() => onPayAgent(liability.agentId)}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        Pay Now
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
