/**
 * @file Public Tap View Page
 * @description Ultra-fast public profile page accessed via NFC tap
 * 
 * @owner Dev 2
 * @module public
 * 
 * @see ProductRequirementsDocument.txt Section 6.4
 * 
 * CRITICAL REQUIREMENTS:
 * - Load time <3s on 3G, <1.5s on 4G
 * - Static generation (ISR) for instant loading
 * - Minimal JavaScript bundle
 * - Image optimization (WebP, <100KB)
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TapViewClient from './TapViewClient'

// Mock profile data - will be fetched from Supabase
const mockProfiles: Record<string, any> = {
    'rahul-verma': {
        fullName: 'Rahul Verma',
        jobTitle: 'Founder & CEO',
        companyName: 'Tech Solutions Pvt Ltd',
        bio: 'Passionate entrepreneur building innovative tech solutions. 10+ years of experience in software development and business strategy.',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
        phone: '+919876543210',
        email: 'rahul@techsolutions.com',
        whatsapp: '+919876543210',
        linkedIn: 'https://linkedin.com/in/rahulverma',
        instagram: 'https://instagram.com/rahulverma',
        facebook: '',
        twitter: 'https://twitter.com/rahulverma',
        website: 'https://rahulverma.com',
        status: 'active'
    },
    'priya-sharma': {
        fullName: 'Priya Sharma',
        jobTitle: 'Marketing Director',
        companyName: 'Creative Agency',
        bio: 'Digital marketing expert specializing in brand strategy and growth hacking.',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
        phone: '+919876543211',
        email: 'priya@creativeagency.com',
        whatsapp: '+919876543211',
        linkedIn: 'https://linkedin.com/in/priyasharma',
        instagram: 'https://instagram.com/priyasharma',
        facebook: '',
        twitter: '',
        website: '',
        status: 'active'
    }
}

interface PageProps {
    params: { slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const profile = mockProfiles[params.slug]

    if (!profile) {
        return { title: 'Profile Not Found | TapOnce' }
    }

    return {
        title: `${profile.fullName} | TapOnce`,
        description: `${profile.jobTitle} at ${profile.companyName}. ${profile.bio?.slice(0, 100)}...`,
        openGraph: {
            title: profile.fullName,
            description: `${profile.jobTitle} at ${profile.companyName}`,
            images: [profile.photo],
        }
    }
}

export default function TapViewPage({ params }: PageProps) {
    const profile = mockProfiles[params.slug]

    if (!profile || profile.status !== 'active') {
        notFound()
    }

    return <TapViewClient profile={profile} slug={params.slug} />
}
