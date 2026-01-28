/**
 * @file Customer Dashboard Home
 * @description Welcome screen with real data and quick actions
 * 
 * @owner Dev 2
 * @module customer
 * 
 * @see ProductRequirementsDocument.txt Section 6.3.5
 */

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Copy,
    CheckCircle,
    Edit,
    Eye,
    Download,
    ExternalLink,
    Calendar,
    RefreshCw,
    Loader2,
    AlertTriangle
} from 'lucide-react'

interface CustomerData {
    name: string
    slug: string
    profileUrl: string
    createdAt: string
    updatedAt: string
    status: string
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

export default function CustomerDashboardHome() {
    const [customer, setCustomer] = useState<CustomerData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        async function fetchCustomerData() {
            try {
                const supabase = createClient()

                // Get current user
                const { data: { user } } = await supabase.auth.getUser()

                if (!user) {
                    setError('Not authenticated')
                    setLoading(false)
                    return
                }

                // Fetch profile
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name, updated_at')
                    .eq('id', user.id)
                    .single()

                // Fetch customer record
                const { data: customerRecord } = await supabase
                    .from('customers')
                    .select('slug, company, status, created_at, updated_at')
                    .eq('profile_id', user.id)
                    .single()

                if (customerRecord) {
                    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://taponce.in'
                    setCustomer({
                        name: profile?.full_name || 'Customer',
                        slug: customerRecord.slug,
                        profileUrl: `${baseUrl}/${customerRecord.slug}`,
                        createdAt: customerRecord.created_at,
                        updatedAt: customerRecord.updated_at || customerRecord.created_at,
                        status: customerRecord.status
                    })
                } else {
                    // No customer record yet (maybe order not approved)
                    setCustomer({
                        name: profile?.full_name || 'Customer',
                        slug: '',
                        profileUrl: '',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        status: 'pending'
                    })
                }
            } catch (err) {
                console.error('Error fetching customer data:', err)
                setError('Failed to load profile')
            } finally {
                setLoading(false)
            }
        }

        fetchCustomerData()
    }, [])

    const handleCopyUrl = () => {
        if (customer?.profileUrl) {
            navigator.clipboard.writeText(customer.profileUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Loading your profile...</p>
            </div>
        )
    }

    if (error || !customer) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
                <p className="text-lg font-medium mb-2">Unable to load profile</p>
                <p className="text-muted-foreground">{error}</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Hi {customer.name}!</h1>
                        {customer.status === 'active' ? (
                            <p className="text-white/80">Your card is active and ready to share.</p>
                        ) : (
                            <p className="text-white/80">Your profile is being set up. Check back soon!</p>
                        )}

                        {/* Profile URL */}
                        {customer.slug && (
                            <div className="mt-4 flex items-center gap-2 bg-white/10 rounded-lg p-3 max-w-md">
                                <span className="text-sm truncate flex-1">{customer.profileUrl}</span>
                                <button
                                    onClick={handleCopyUrl}
                                    className="p-2 hover:bg-white/10 rounded transition-colors"
                                    title="Copy URL"
                                >
                                    {copied ? (
                                        <CheckCircle className="w-5 h-5 text-green-300" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                                <a
                                    href={`/${customer.slug}`}
                                    target="_blank"
                                    className="p-2 hover:bg-white/10 rounded transition-colors"
                                    title="Open in new tab"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        )}
                    </div>

                    <Badge className={customer.status === 'active' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}>
                        {customer.status === 'active' ? (
                            <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Active
                            </>
                        ) : (
                            'Pending'
                        )}
                    </Badge>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-100">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Account Created</span>
                    </div>
                    <p className="text-xl font-bold">{formatDate(customer.createdAt)}</p>
                </div>

                <div className="bg-white rounded-xl border p-5">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-100">
                            <RefreshCw className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-muted-foreground">Last Profile Update</span>
                    </div>
                    <p className="text-xl font-bold">{formatDate(customer.updatedAt)}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href="/dashboard/profile">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2" size="lg">
                            <Edit className="w-6 h-6 text-blue-500" />
                            <span>Edit Profile</span>
                        </Button>
                    </a>
                    <a href="/dashboard/preview">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2" size="lg">
                            <Eye className="w-6 h-6 text-purple-500" />
                            <span>Preview Public Page</span>
                        </Button>
                    </a>
                    <a href="/dashboard/download">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2" size="lg">
                            <Download className="w-6 h-6 text-green-500" />
                            <span>Download Portfolio</span>
                        </Button>
                    </a>
                </div>
            </div>

            {/* Help Section */}
            <div className="bg-gray-50 rounded-xl border p-6 text-center">
                <p className="text-muted-foreground mb-2">Need to change your password?</p>
                <p className="text-sm">
                    Contact admin via WhatsApp or email for password reset assistance.
                </p>
            </div>
        </div>
    )
}
