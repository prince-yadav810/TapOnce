/**
 * @file Customer Filters Component
 * @description Search and filter controls for customer list
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
import { Search, X, Filter, Plus } from 'lucide-react'
import { CustomerStatus } from '@/types/customer'

interface CustomerFiltersProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    selectedStatus: CustomerStatus | null
    onStatusChange: (status: CustomerStatus | null) => void
    onClearFilters: () => void
}

export function CustomerFilters({
    searchQuery,
    onSearchChange,
    selectedStatus,
    onStatusChange,
    onClearFilters
}: CustomerFiltersProps) {
    const hasActiveFilters = searchQuery || selectedStatus

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[250px] max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name, email, or phone..."
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

            {/* Status Filter */}
            <Select
                value={selectedStatus || 'all'}
                onValueChange={(value) => onStatusChange(value === 'all' ? null : value as CustomerStatus)}
            >
                <SelectTrigger className="w-[150px]">
                    <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
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
