/**
 * @file Admin Data Hooks
 * @description React hooks for fetching admin data with caching and error handling
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { KanbanOrder } from '@/types/kanban'
import { Agent } from '@/types/agent'

interface FetchState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

/**
 * Hook to fetch and manage orders
 */
export function useAdminOrders() {
    const [state, setState] = useState<FetchState<KanbanOrder[]>>({
        data: null,
        loading: true,
        error: null
    })

    const fetchOrders = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await fetch('/api/admin/orders', {
                credentials: 'include'
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to fetch orders')
            }

            const data = await response.json()
            setState({
                data: data.orders,
                loading: false,
                error: null
            })
        } catch (err) {
            console.error('Error fetching orders:', err)
            setState({
                data: null,
                loading: false,
                error: err instanceof Error ? err.message : 'Failed to fetch orders'
            })
        }
    }, [])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const updateOrderStatus = async (orderId: string, status: string) => {
        try {
            const response = await fetch(`/api/admin/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to update order')
            }

            // Optimistically update local state
            setState(prev => ({
                ...prev,
                data: prev.data?.map(order =>
                    order.id === orderId ? { ...order, status: status as KanbanOrder['status'] } : order
                ) || null
            }))

            return true
        } catch (err) {
            console.error('Error updating order:', err)
            return false
        }
    }

    return {
        orders: state.data || [],
        loading: state.loading,
        error: state.error,
        refetch: fetchOrders,
        updateOrderStatus
    }
}

/**
 * Hook to fetch and manage agents
 */
export function useAdminAgents() {
    const [state, setState] = useState<FetchState<Agent[]>>({
        data: null,
        loading: true,
        error: null
    })

    const fetchAgents = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }))

        try {
            const response = await fetch('/api/admin/agents', {
                credentials: 'include'
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to fetch agents')
            }

            const data = await response.json()
            setState({
                data: data.agents,
                loading: false,
                error: null
            })
        } catch (err) {
            console.error('Error fetching agents:', err)
            setState({
                data: null,
                loading: false,
                error: err instanceof Error ? err.message : 'Failed to fetch agents'
            })
        }
    }, [])

    useEffect(() => {
        fetchAgents()
    }, [fetchAgents])

    return {
        agents: state.data || [],
        loading: state.loading,
        error: state.error,
        refetch: fetchAgents
    }
}
