/**
 * @file Admin Orders Page
 * @description Kanban board for order management with real data from Supabase
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useEffect } from 'react'
import { KanbanBoard } from '@/components/admin/KanbanBoard'
import { KanbanColumn, KanbanOrder } from '@/types/kanban'
import { useAdminOrders } from '@/hooks/useAdminData'
import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react'

// Column definitions
const columns: KanbanColumn[] = [
    { id: 'pending_approval', title: 'Pending Approval', color: '#fbbf24' },
    { id: 'approved', title: 'Approved', color: '#3b82f6' },
    { id: 'printing', title: 'Printing', color: '#a855f7' },
    { id: 'ready_to_ship', title: 'Ready to Ship', color: '#ec4899' },
    { id: 'shipped', title: 'Shipped', color: '#10b981' },
    { id: 'delivered', title: 'Delivered', color: '#6366f1' },
]

export default function AdminOrdersPage() {
    const { orders, loading, error, refetch, updateOrderStatus } = useAdminOrders()
    const [agents, setAgents] = useState<{ id: string; fullName: string; referralCode: string }[]>([])

    // Fetch agents for the dropdown
    useEffect(() => {
        async function fetchAgents() {
            try {
                const response = await fetch('/api/admin/agents', {
                    credentials: 'include'
                })
                if (response.ok) {
                    const data = await response.json()
                    setAgents(data.agents.map((a: any) => ({
                        id: a.id,
                        fullName: a.fullName,
                        referralCode: a.referralCode
                    })))
                }
            } catch (err) {
                console.error('Failed to fetch agents:', err)
            }
        }
        fetchAgents()
    }, [])

    // Handle order status update from Kanban
    const handleOrderUpdate = async (orderId: string, newStatus: string) => {
        const success = await updateOrderStatus(orderId, newStatus)
        if (!success) {
            // Refetch to restore correct state
            refetch()
        }
    }

    // Handle order approval (creates customer account)
    const handleOrderApprove = async (orderId: string) => {
        try {
            const response = await fetch(`/api/admin/orders/${orderId}/approve`, {
                method: 'POST',
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                console.log('Order approved:', data)
                refetch() // Refresh to get updated data
            } else {
                const errorData = await response.json()
                alert(`Failed to approve order: ${errorData.error}`)
                refetch()
            }
        } catch (err) {
            console.error('Error approving order:', err)
            refetch()
        }
    }

    // Handle order rejection
    const handleOrderReject = async (orderId: string, reason: string) => {
        try {
            const response = await fetch(`/api/admin/orders/${orderId}/reject`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ reason })
            })

            if (response.ok) {
                console.log('Order rejected')
                refetch()
            } else {
                const errorData = await response.json()
                alert(`Failed to reject order: ${errorData.error}`)
                refetch()
            }
        } catch (err) {
            console.error('Error rejecting order:', err)
            refetch()
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Loading orders...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
                <p className="text-lg font-medium mb-2">Failed to load orders</p>
                <p className="text-muted-foreground mb-4">{error}</p>
                <button
                    onClick={refetch}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Order Board</h1>
                    <p className="text-muted-foreground">
                        {orders.length} orders total. Drag cards to update status.
                    </p>
                </div>
                <button
                    onClick={refetch}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-muted"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            <div className="bg-muted/10 rounded-xl border p-4">
                <KanbanBoard
                    initialColumns={columns}
                    initialOrders={orders}
                    agents={agents}
                    onOrderUpdate={handleOrderUpdate}
                    onOrderApprove={handleOrderApprove}
                    onOrderReject={handleOrderReject}
                />
            </div>
        </div>
    )
}
