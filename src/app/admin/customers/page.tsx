/**
 * @file Admin Customers Page
 * @description Customer management with list, detail modal, and actions
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useMemo } from 'react'
import { CustomerTable } from '@/components/admin/CustomerTable'
import { CustomerFilters } from '@/components/admin/CustomerFilters'
import { CustomerDetailModal } from '@/components/admin/CustomerDetailModal'
import { Customer, CustomerStatus } from '@/types/customer'
import { Users } from 'lucide-react'

// Mock Data - will be replaced with Supabase queries
const mockCustomers: Customer[] = [
    {
        id: '1',
        profileId: 'profile-1',
        slug: 'rahul-verma',
        fullName: 'Rahul Verma',
        company: 'Tech Solutions Pvt Ltd',
        jobTitle: 'Founder & CEO',
        bio: 'Building the future of digital networking. Passionate about technology and innovation.',
        avatarUrl: '',
        phone: '+91 98765 43210',
        email: 'rahul@techsolutions.in',
        whatsapp: '+919876543210',
        linkedinUrl: 'https://linkedin.com/in/rahul-verma',
        instagramUrl: 'https://instagram.com/rahulverma',
        customLinks: [
            { label: 'Portfolio', url: 'https://rahulverma.dev' }
        ],
        status: 'active',
        createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '2',
        profileId: 'profile-2',
        slug: 'priya-singh',
        fullName: 'Priya Singh',
        company: 'Creative Studio',
        jobTitle: 'Creative Director',
        bio: 'Award-winning designer with 10+ years experience.',
        avatarUrl: '',
        phone: '+91 87654 32109',
        email: 'priya@creativestudio.in',
        linkedinUrl: 'https://linkedin.com/in/priya-singh',
        customLinks: [],
        status: 'active',
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '3',
        profileId: 'profile-3',
        slug: 'amit-shah',
        fullName: 'Amit Shah',
        company: 'Shah Enterprises',
        jobTitle: 'Managing Director',
        bio: '',
        avatarUrl: '',
        phone: '+91 76543 21098',
        email: 'amit@shahenterprises.com',
        whatsapp: '+917654321098',
        websiteUrl: 'https://shahenterprises.com',
        customLinks: [],
        status: 'pending',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '4',
        profileId: 'profile-4',
        slug: 'neha-gupta',
        fullName: 'Neha Gupta',
        company: 'Wellness Hub',
        jobTitle: 'Wellness Coach',
        bio: 'Helping people live healthier, happier lives.',
        avatarUrl: '',
        phone: '+91 65432 10987',
        email: 'neha@wellnesshub.in',
        instagramUrl: 'https://instagram.com/nehawellness',
        facebookUrl: 'https://facebook.com/nehawellness',
        customLinks: [
            { label: 'Book Session', url: 'https://calendly.com/neha' }
        ],
        status: 'active',
        createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '5',
        profileId: 'profile-5',
        slug: 'vikram-patel',
        fullName: 'Vikram Patel',
        company: 'Patel & Associates',
        jobTitle: 'Senior Partner',
        bio: 'Corporate law specialist with expertise in M&A.',
        avatarUrl: '',
        phone: '+91 54321 09876',
        email: 'vikram@patellaw.in',
        linkedinUrl: 'https://linkedin.com/in/vikram-patel',
        customLinks: [],
        status: 'suspended',
        createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
        updatedAt: new Date().toISOString()
    }
]

export default function AdminCustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedStatus, setSelectedStatus] = useState<CustomerStatus | null>(null)
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    // Filtered customers
    const filteredCustomers = useMemo(() => {
        let result = customers

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(c =>
                c.fullName.toLowerCase().includes(query) ||
                c.email.toLowerCase().includes(query) ||
                c.phone.includes(query) ||
                c.slug.includes(query)
            )
        }

        // Status filter
        if (selectedStatus) {
            result = result.filter(c => c.status === selectedStatus)
        }

        return result
    }, [customers, searchQuery, selectedStatus])

    // Stats
    const stats = useMemo(() => ({
        total: customers.length,
        active: customers.filter(c => c.status === 'active').length,
        pending: customers.filter(c => c.status === 'pending').length,
        suspended: customers.filter(c => c.status === 'suspended').length
    }), [customers])

    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer)
        setModalOpen(true)
    }

    const handleEditCustomer = (customer: Customer) => {
        // TODO: Open edit form
        console.log('Edit customer:', customer.id)
    }

    const handleToggleStatus = (customer: Customer) => {
        const newStatus: CustomerStatus = customer.status === 'active' ? 'suspended' : 'active'
        setCustomers(prev => prev.map(c =>
            c.id === customer.id ? { ...c, status: newStatus } : c
        ))
        setModalOpen(false)
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedStatus(null)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
                    <p className="text-muted-foreground">
                        Manage customer profiles and portfolios
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-semibold">{stats.total}</span>
                    </div>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span>{stats.active} active</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>{stats.pending} pending</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4">
                <CustomerFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    onClearFilters={clearFilters}
                />
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <CustomerTable
                    customers={filteredCustomers}
                    onViewCustomer={handleViewCustomer}
                    onEditCustomer={handleEditCustomer}
                    onToggleStatus={handleToggleStatus}
                />
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredCustomers.length} of {customers.length} customers
            </div>

            {/* Detail Modal */}
            <CustomerDetailModal
                customer={selectedCustomer}
                open={modalOpen}
                onOpenChange={setModalOpen}
                onEdit={handleEditCustomer}
                onToggleStatus={handleToggleStatus}
            />
        </div>
    )
}
