/**
 * @file Status Badge Component
 * @description Reusable status badge with color coding for order statuses
 * 
 * @owner Dev 1
 * @shared Used by Admin Dashboard and Agent Dashboard
 */

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@/types/order'

interface StatusBadgeProps {
    status: OrderStatus
    className?: string
}

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
    pending_approval: {
        label: 'Pending Approval',
        color: 'bg-amber-100 text-amber-800 border-amber-200'
    },
    approved: {
        label: 'Approved',
        color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    printing: {
        label: 'Printing',
        color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    printed: {
        label: 'Printed',
        color: 'bg-violet-100 text-violet-800 border-violet-200'
    },
    ready_to_ship: {
        label: 'Ready to Ship',
        color: 'bg-pink-100 text-pink-800 border-pink-200'
    },
    shipped: {
        label: 'Shipped',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    },
    delivered: {
        label: 'Delivered',
        color: 'bg-green-100 text-green-800 border-green-200'
    },
    paid: {
        label: 'Paid',
        color: 'bg-teal-100 text-teal-800 border-teal-200'
    },
    rejected: {
        label: 'Rejected',
        color: 'bg-red-100 text-red-800 border-red-200'
    },
    cancelled: {
        label: 'Cancelled',
        color: 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status]

    return (
        <Badge
            variant="outline"
            className={cn(config.color, 'font-medium', className)}
        >
            {config.label}
        </Badge>
    )
}

export { statusConfig }
