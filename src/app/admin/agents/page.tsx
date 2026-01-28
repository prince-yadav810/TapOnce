/**
 * @file Admin Agents Page
 * @description Agent management with list, create, detail, and payout modals
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useMemo, useEffect } from 'react'
import { AgentTable } from '@/components/admin/AgentTable'
import { AgentFilters } from '@/components/admin/AgentFilters'
import { AgentDetailModal } from '@/components/admin/AgentDetailModal'
import { CreateAgentModal } from '@/components/admin/CreateAgentModal'
import { PayoutModal } from '@/components/admin/PayoutModal'
import { PendingApplications } from '@/components/admin/PendingApplications'
import { Agent, AgentStatus, CreateAgentPayload, PayoutPayload } from '@/types/agent'
import { AgentApplication } from '@/types/agent-application'
import { Users, IndianRupee, TrendingUp, Wallet, Loader2, RefreshCw } from 'lucide-react'

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export default function AdminAgentsPage() {
    const [agents, setAgents] = useState<Agent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<AgentStatus | null>(null)
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [payoutAgent, setPayoutAgent] = useState<Agent | null>(null)
    const [payoutModalOpen, setPayoutModalOpen] = useState(false)

    // Fetch agents from API on mount
    const fetchAgents = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/admin/agents', {
                credentials: 'include'
            })
            if (response.ok) {
                const data = await response.json()
                setAgents(data.agents || [])
            } else {
                setError('Failed to fetch agents')
            }
        } catch (err) {
            console.error('Error fetching agents:', err)
            setError('Error loading agents')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAgents()
    }, [])

    // Filtered agents based on search and status
    const filteredAgents = useMemo(() => {
        let result = agents

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(a =>
                a.fullName.toLowerCase().includes(query) ||
                a.email.toLowerCase().includes(query) ||
                a.referralCode.toLowerCase().includes(query) ||
                a.phone.includes(query)
            )
        }

        // Status filter
        if (selectedStatus) {
            result = result.filter(a => a.status === selectedStatus)
        }

        return result
    }, [agents, searchQuery, selectedStatus])

    // Stats
    const stats = useMemo(() => ({
        total: agents.length,
        active: agents.filter(a => a.status === 'active').length,
        totalSales: agents.reduce((sum, a) => sum + a.totalSales, 0),
        totalOwed: agents.reduce((sum, a) => sum + a.availableBalance, 0),
        totalEarnings: agents.reduce((sum, a) => sum + a.totalEarnings, 0)
    }), [agents])

    const handleViewAgent = (agent: Agent) => {
        setSelectedAgent(agent)
        setDetailModalOpen(true)
    }

    const handleEditAgent = (agent: Agent) => {
        // TODO: Open edit form
        console.log('Edit agent:', agent.id)
    }

    const handlePayAgent = (agent: Agent) => {
        setPayoutAgent(agent)
        setPayoutModalOpen(true)
        setDetailModalOpen(false)
    }

    const handleToggleStatus = async (agent: Agent) => {
        const newStatus: AgentStatus = agent.status === 'active' ? 'inactive' : 'active'

        try {
            const response = await fetch(`/api/admin/agents/${agent.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status: newStatus })
            })

            if (response.ok) {
                setAgents(prev => prev.map(a =>
                    a.id === agent.id ? { ...a, status: newStatus } : a
                ))
                setDetailModalOpen(false)
            } else {
                const errorData = await response.json()
                console.error('Failed to update agent status:', errorData.error)
                alert('Failed to update agent status')
            }
        } catch (err) {
            console.error('Error updating agent status:', err)
            alert('Error updating agent status')
        }
    }

    const handleCreateAgent = async (data: CreateAgentPayload) => {
        // TODO: Implement createAgent API call
        console.log('Create agent:', data)
        setCreateModalOpen(false)
        // After real implementation, call fetchAgents()
    }

    const handlePayout = async (agentId: string, data: PayoutPayload) => {
        try {
            const response = await fetch(`/api/admin/payouts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    agentId,
                    amount: data.amount,
                    method: data.paymentMethod,
                    notes: data.adminNotes
                })
            })

            if (response.ok) {
                // Update local state
                setAgents(prev => prev.map(a =>
                    a.id === agentId
                        ? { ...a, availableBalance: a.availableBalance - data.amount }
                        : a
                ))
                setPayoutModalOpen(false)
            } else {
                const errorData = await response.json()
                console.error('Failed to process payout:', errorData.error)
                alert('Failed to process payout')
            }
        } catch (err) {
            console.error('Error processing payout:', err)
            alert('Error processing payout')
        }
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedStatus(null)
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading agents...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <p className="text-lg text-red-500 mb-4">{error}</p>
                <button
                    onClick={fetchAgents}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
                >
                    <RefreshCw className="w-4 h-4" />
                    Retry
                </button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
                    <p className="text-muted-foreground">
                        Manage marketing agents and commissions
                    </p>
                </div>
                <button
                    onClick={fetchAgents}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-muted"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">Total Agents</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.total}</p>
                    <p className="text-xs text-green-600">{stats.active} active</p>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs">Total Sales</span>
                    </div>
                    <p className="text-2xl font-bold">{stats.totalSales}</p>
                    <p className="text-xs text-muted-foreground">cards sold</p>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-xs">Total Earnings</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(stats.totalEarnings)}
                    </p>
                </div>
                <div className="p-4 border rounded-lg bg-amber-50">
                    <div className="flex items-center gap-2 text-amber-700 mb-1">
                        <Wallet className="w-4 h-4" />
                        <span className="text-xs">Commission Owed</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600">
                        {formatCurrency(stats.totalOwed)}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4">
                <AgentFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    onClearFilters={clearFilters}
                    onCreateAgent={() => setCreateModalOpen(true)}
                />
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <AgentTable
                    agents={filteredAgents}
                    onViewAgent={handleViewAgent}
                    onEditAgent={handleEditAgent}
                    onPayAgent={handlePayAgent}
                    onToggleStatus={handleToggleStatus}
                />
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredAgents.length} of {agents.length} agents
            </div>

            {/* Pending Applications Section */}
            <div className="mt-6 bg-white border rounded-lg p-4">
                <PendingApplications
                    onApprove={(application: AgentApplication) => {
                        // Open create modal pre-filled with application data
                        setCreateModalOpen(true)
                        // Note: You could pre-fill the create form here
                        console.log('Approve application:', application)
                    }}
                />
            </div>

            {/* Modals */}
            <AgentDetailModal
                agent={selectedAgent}
                open={detailModalOpen}
                onOpenChange={setDetailModalOpen}
                onEdit={handleEditAgent}
                onPay={handlePayAgent}
                onToggleStatus={handleToggleStatus}
            />

            <CreateAgentModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                existingAgents={agents}
                onSubmit={handleCreateAgent}
            />

            <PayoutModal
                agent={payoutAgent}
                open={payoutModalOpen}
                onOpenChange={setPayoutModalOpen}
                onSubmit={handlePayout}
            />
        </div>
    )
}
