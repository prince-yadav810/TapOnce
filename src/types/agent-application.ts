/**
 * @file Agent Application Type Definitions
 * @description Types for agent recruitment applications
 * 
 * @owner Dev 1
 */

/**
 * Agent application status
 */
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

/**
 * Agent application from recruitment form
 */
export interface AgentApplication {
    id: string
    fullName: string
    email: string
    phone: string
    city: string
    experience?: string
    referralCodeUsed?: string
    parentAgentId?: string
    generatedReferralCode: string
    status: ApplicationStatus
    appliedAt: string
    reviewedAt?: string
    reviewedBy?: string
    rejectionReason?: string
}

/**
 * API response for fetching applications
 */
export interface AgentApplicationsResponse {
    applications: AgentApplication[]
    total: number
}
