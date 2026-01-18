/**
 * @file Order Filters Component
 * @description Search and filter controls for the Kanban board
 * 
 * @owner Dev 1
 */

'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Search, X, Filter } from 'lucide-react'

interface Agent {
    id: string
    fullName: string
    referralCode: string
}

interface OrderFiltersProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    selectedAgent: string | null
    onAgentChange: (agentId: string | null) => void
    agents: Agent[]
    onClearFilters: () => void
}

export function OrderFilters({
    searchQuery,
    onSearchChange,
    selectedAgent,
    onAgentChange,
    agents,
    onClearFilters
}: OrderFiltersProps) {
    const hasActiveFilters = searchQuery || selectedAgent

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name or order #..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 pr-8"
                />
                {searchQuery && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Agent Filter */}
            <Select
                value={selectedAgent || 'all'}
                onValueChange={(value) => onAgentChange(value === 'all' ? null : value)}
            >
                <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Filter by agent" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Agents</SelectItem>
                    <SelectItem value="direct">Direct Sales</SelectItem>
                    {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                            {agent.fullName} ({agent.referralCode})
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                </Button>
            )}
        </div>
    )
}
