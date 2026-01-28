/**
 * @file Pending Agent Applications Component
 * @description Shows pending agent applications for admin to approve
 * 
 * @owner Dev 1
 */

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AgentApplication } from '@/types/agent-application'
import { Check, X, Clock, User, Phone, Mail, MapPin, Loader2, RefreshCw, AlertTriangle } from 'lucide-react'

interface PendingApplicationsProps {
    onApprove?: (application: AgentApplication) => void
}

export function PendingApplications({ onApprove }: PendingApplicationsProps) {
    const [applications, setApplications] = useState<AgentApplication[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [processingId, setProcessingId] = useState<string | null>(null)

    const fetchApplications = async () => {
        setLoading(true)
        setError(null)

        try {
            const supabase = createClient()

            // Fetch from agent_applications table
            const { data, error: fetchError } = await supabase
                .from('agent_applications')
                .select('*')
                .eq('status', 'pending')
                .order('created_at', { ascending: false })

            if (fetchError) {
                console.error('Error fetching applications:', fetchError)
                setError('Could not load applications')
                setApplications([])
                return
            }

            // Map to our interface
            const parsedApplications: AgentApplication[] = (data || []).map((app: any) => ({
                id: app.id,
                fullName: app.full_name,
                email: app.email,
                phone: app.phone,
                city: app.city,
                experience: app.experience,
                referralCodeUsed: app.referral_code_used,
                parentAgentId: app.parent_agent_id,
                generatedReferralCode: app.generated_referral_code,
                status: app.status,
                appliedAt: app.created_at,
                reviewedAt: app.reviewed_at,
                reviewedBy: app.reviewed_by,
                rejectionReason: app.rejection_reason
            }))

            setApplications(parsedApplications)
        } catch (err) {
            console.error('Error:', err)
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchApplications()
    }, [])

    const handleApprove = async (application: AgentApplication) => {
        setProcessingId(application.id)

        try {
            const supabase = createClient()

            // Update application status
            const { error: updateError } = await supabase
                .from('agent_applications')
                .update({
                    status: 'approved',
                    reviewed_at: new Date().toISOString()
                })
                .eq('id', application.id)

            if (updateError) {
                console.error('Error approving:', updateError)
                return
            }

            // Remove from local state
            setApplications(prev => prev.filter(a => a.id !== application.id))

            // Call parent handler if provided
            if (onApprove) {
                onApprove(application)
            }

        } catch (err) {
            console.error('Error approving:', err)
        } finally {
            setProcessingId(null)
        }
    }

    const handleReject = async (application: AgentApplication) => {
        setProcessingId(application.id)

        try {
            const supabase = createClient()

            // Update status to rejected
            const { error: updateError } = await supabase
                .from('agent_applications')
                .update({
                    status: 'rejected',
                    reviewed_at: new Date().toISOString()
                })
                .eq('id', application.id)

            if (updateError) {
                console.error('Error rejecting:', updateError)
                return
            }

            // Remove from local state
            setApplications(prev => prev.filter(a => a.id !== application.id))

        } catch (err) {
            console.error('Error rejecting:', err)
        } finally {
            setProcessingId(null)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Loading applications...
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                <AlertTriangle className="w-8 h-8 text-amber-500 mb-2" />
                <p>{error}</p>
                <button
                    onClick={fetchApplications}
                    className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try again
                </button>
            </div>
        )
    }

    if (applications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                <Clock className="w-8 h-8 mb-2 opacity-50" />
                <p>No pending applications</p>
                <button
                    onClick={fetchApplications}
                    className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    Pending Applications ({applications.length})
                </h3>
                <button
                    onClick={fetchApplications}
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            <div className="space-y-3">
                {applications.map((application) => (
                    <div
                        key={application.id}
                        className="bg-amber-50 border border-amber-200 rounded-lg p-4"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="w-4 h-4 text-amber-600" />
                                    <span className="font-semibold">{application.fullName}</span>
                                    {application.referralCodeUsed && (
                                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded">
                                            Referred by: {application.referralCodeUsed}
                                        </span>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Phone className="w-3 h-3" />
                                        {application.phone}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Mail className="w-3 h-3" />
                                        {application.email}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {application.city}
                                    </div>
                                </div>
                                {application.experience && (
                                    <div className="mt-2 text-sm text-muted-foreground">
                                        <span className="font-medium">Experience:</span> {application.experience}
                                    </div>
                                )}
                                <div className="mt-2 text-xs text-muted-foreground">
                                    Applied {new Date(application.appliedAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleReject(application)}
                                    disabled={processingId === application.id}
                                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                                    title="Reject"
                                >
                                    {processingId === application.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <X className="w-4 h-4" />
                                    )}
                                </button>
                                <button
                                    onClick={() => handleApprove(application)}
                                    disabled={processingId === application.id}
                                    className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                                    title="Approve & Create Agent"
                                >
                                    {processingId === application.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Check className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
