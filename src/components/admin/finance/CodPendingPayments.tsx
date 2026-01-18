/**
 * @file COD Pending Payments Component
 * @description List of COD orders awaiting payment collection
 * 
 * @owner Dev 1
 */

'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, Clock, AlertTriangle } from 'lucide-react'

interface CodOrder {
    orderId: string
    orderNumber: number
    customerName: string
    customerPhone: string
    amount: number
    daysPending: number
}

interface CodPendingPaymentsProps {
    orders: CodOrder[]
    totalAmount: number
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export function CodPendingPayments({ orders, totalAmount }: CodPendingPaymentsProps) {
    const callCustomer = (phone: string) => {
        window.open(`tel:${phone}`, '_self')
    }

    return (
        <div className="p-4 rounded-xl border bg-white">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-semibold">COD Pending Payments</h3>
                    <p className="text-sm text-muted-foreground">
                        {orders.length} order{orders.length !== 1 ? 's' : ''} awaiting payment
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Pending</p>
                    <p className="text-xl font-bold text-orange-600">{formatCurrency(totalAmount)}</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="py-8 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-muted-foreground">No pending COD payments!</p>
                </div>
            ) : (
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                    {orders.map((order) => (
                        <div
                            key={order.orderId}
                            className="flex items-center justify-between p-3 border rounded-lg"
                        >
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">#{order.orderNumber}</span>
                                    <span className="text-muted-foreground">•</span>
                                    <span>{order.customerName}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    {order.daysPending > 10 ? (
                                        <Badge variant="destructive" className="text-xs">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            {order.daysPending}d overdue
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-xs">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {order.daysPending}d pending
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-semibold">{formatCurrency(order.amount)}</span>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => callCustomer(order.customerPhone)}
                                >
                                    <Phone className="w-4 h-4 mr-1" />
                                    Call
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
