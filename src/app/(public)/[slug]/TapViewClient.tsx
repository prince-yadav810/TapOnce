/**
 * @file Tap View Client Component
 * @description Mobile-first profile display with vCard download
 */

'use client'

import { useState } from 'react'
import {
    Phone,
    Mail,
    MessageCircle,
    Linkedin,
    Instagram,
    Facebook,
    Twitter,
    Globe,
    Download,
    FileText,
    Image as ImageIcon,
    CreditCard,
    ChevronDown,
    ChevronUp
} from 'lucide-react'

interface Profile {
    fullName: string
    jobTitle: string
    companyName: string
    bio: string
    photo: string
    phone: string
    email: string
    whatsapp: string
    linkedIn: string
    instagram: string
    facebook: string
    twitter: string
    website: string
}

interface TapViewClientProps {
    profile: Profile
    slug: string
}

// Generate vCard content
function generateVCard(profile: Profile): string {
    return `BEGIN:VCARD
VERSION:3.0
FN:${profile.fullName}
ORG:${profile.companyName}
TITLE:${profile.jobTitle}
TEL;TYPE=CELL:${profile.phone}
EMAIL:${profile.email}
URL:${profile.website}
X-SOCIALPROFILE;TYPE=linkedin:${profile.linkedIn}
X-SOCIALPROFILE;TYPE=instagram:${profile.instagram}
NOTE:${profile.bio?.replace(/\n/g, '\\n')}
END:VCARD`
}

export default function TapViewClient({ profile, slug }: TapViewClientProps) {
    const [bioExpanded, setBioExpanded] = useState(false)

    const handleSaveContact = () => {
        const vcard = generateVCard(profile)
        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${profile.fullName.replace(/\s+/g, '_')}_Contact.vcf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    // Build social links array
    const socialLinks = [
        { url: profile.linkedIn, icon: Linkedin, label: 'LinkedIn', color: 'bg-[#0077B5]' },
        { url: profile.instagram, icon: Instagram, label: 'Instagram', color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500' },
        { url: profile.twitter, icon: Twitter, label: 'Twitter', color: 'bg-[#1DA1F2]' },
        { url: profile.facebook, icon: Facebook, label: 'Facebook', color: 'bg-[#1877F2]' },
        { url: profile.website, icon: Globe, label: 'Website', color: 'bg-gray-700' },
    ].filter(link => link.url)

    // Truncate bio for initial display
    const shouldTruncateBio = profile.bio?.length > 150

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Main Content */}
            <main className="max-w-md mx-auto px-4 py-8">
                {/* Profile Photo */}
                <div className="text-center mb-6">
                    <img
                        src={profile.photo}
                        alt={profile.fullName}
                        className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl mx-auto"
                        loading="eager"
                    />
                </div>

                {/* Name & Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
                    <p className="text-lg text-gray-600 mt-1">{profile.jobTitle}</p>
                    <p className="text-sm text-gray-500">{profile.companyName}</p>
                </div>

                {/* Bio */}
                {profile.bio && (
                    <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                        <p className={`text-gray-600 text-sm whitespace-pre-line ${!bioExpanded && shouldTruncateBio ? 'line-clamp-3' : ''}`}>
                            {profile.bio}
                        </p>
                        {shouldTruncateBio && (
                            <button
                                onClick={() => setBioExpanded(!bioExpanded)}
                                className="text-blue-600 text-sm mt-2 flex items-center gap-1 hover:underline"
                            >
                                {bioExpanded ? (
                                    <>Show Less <ChevronUp className="w-4 h-4" /></>
                                ) : (
                                    <>Read More <ChevronDown className="w-4 h-4" /></>
                                )}
                            </button>
                        )}
                    </div>
                )}

                {/* Contact Actions */}
                <div className="flex justify-center gap-4 mb-6">
                    <a
                        href={`tel:${profile.phone}`}
                        className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
                        title="Call"
                    >
                        <Phone className="w-6 h-6" />
                    </a>
                    <a
                        href={`mailto:${profile.email}`}
                        className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                        title="Email"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                    {profile.whatsapp && (
                        <a
                            href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}?text=Hi ${profile.fullName}, I just tapped your smart card!`}
                            target="_blank"
                            className="p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
                            title="WhatsApp"
                        >
                            <MessageCircle className="w-6 h-6" />
                        </a>
                    )}
                </div>

                {/* Save Contact Button - Primary CTA */}
                <button
                    onClick={handleSaveContact}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mb-6"
                >
                    <Download className="w-5 h-5" />
                    Save Contact
                </button>

                {/* Social Links */}
                {socialLinks.length > 0 && (
                    <div className="space-y-3 mb-6">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-3 p-4 ${social.color} text-white rounded-xl hover:opacity-90 transition-opacity shadow-md`}
                            >
                                <social.icon className="w-5 h-5" />
                                <span className="font-medium">{social.label}</span>
                            </a>
                        ))}
                    </div>
                )}

                {/* Download Portfolio */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">PDF</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-sm">Image</span>
                    </button>
                </div>

                {/* Get Your Card CTA */}
                <a
                    href="/"
                    className="block w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-center font-medium shadow-lg hover:opacity-90 transition-opacity"
                >
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    Get Your Own Smart Card
                </a>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center border-t bg-white">
                <p className="text-xs text-gray-400">
                    Powered by <span className="font-semibold text-blue-600">TapOnce</span>
                </p>
                <a
                    href="/login"
                    className="text-xs text-gray-400 hover:text-gray-600 mt-1 inline-block"
                >
                    Login
                </a>
            </footer>
        </div>
    )
}
