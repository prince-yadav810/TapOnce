"use client"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ArrowRight, Check, ChevronRight, DollarSign, Users, Clock, Loader2, PartyPopper, Briefcase, TrendingUp, Award } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const benefits = [
    {
        icon: DollarSign,
        title: "Earn ₹100+ Per Sale",
        description: "Base commission on every card sold, plus bonuses for exceeding targets"
    },
    {
        icon: TrendingUp,
        title: "Unlimited Earning Potential",
        description: "The more you sell, the more you earn. No caps or limits."
    },
    {
        icon: Users,
        title: "Build Your Network",
        description: "Recruit sub-agents and earn 2% override on all their sales"
    },
    {
        icon: Clock,
        title: "Flexible Schedule",
        description: "Work part-time or full-time. You control your hours."
    },
    {
        icon: Briefcase,
        title: "Marketing Support",
        description: "Get sales training, demo cards, and marketing materials"
    },
    {
        icon: Award,
        title: "Performance Rewards",
        description: "Top agents get exclusive bonuses and recognition"
    }
]

export default function BecomeAgentPage() {
    const searchParams = useSearchParams()
    const refCode = searchParams.get('ref')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        experience: "",
        referralCode: refCode || ""
    })

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        setError(null)
    }

    const isFormValid = form.fullName && form.phone.length >= 10 && form.email.includes('@') && form.city

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/agents/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit application')
            }

            setSuccess(true)

        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <main className="min-h-screen bg-[#050505] text-white">
                <Navbar />

                <div className="container mx-auto px-4 py-24">
                    <div className="max-w-lg mx-auto text-center">
                        {/* Success Animation */}
                        <div className="flex justify-center mb-8">
                            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center animate-bounce">
                                <PartyPopper className="h-12 w-12 text-white" />
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
                        <p className="text-zinc-400 mb-8">
                            Thank you for your interest in joining the TapOnce team. Our team will review your application and contact you within 48 hours.
                        </p>

                        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 mb-8">
                            <h3 className="font-medium text-white mb-3">What happens next?</h3>
                            <ul className="space-y-3 text-left text-zinc-400">
                                <li className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Our team will review your application</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>You&apos;ll receive a call or WhatsApp message</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Once approved, you&apos;ll get your login credentials</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Start selling and earning commissions!</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>

                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12">
                <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent" />
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-6">
                            <Users className="h-4 w-4" />
                            Join our growing network
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                            Become a TapOnce{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                                Agent
                            </span>
                        </h1>

                        <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
                            Earn great commissions selling premium NFC smart cards. Flexible hours, unlimited potential, and all the support you need to succeed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-10">Why Agents Love TapOnce</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {benefits.map((benefit, i) => (
                            <div
                                key={i}
                                className="bg-zinc-900/50 border border-white/5 rounded-xl p-6 hover:border-violet-500/30 transition-colors"
                            >
                                <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                                    <benefit.icon className="h-6 w-6 text-violet-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-zinc-400 text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-12" id="apply">
                <div className="container mx-auto px-4">
                    <div className="max-w-xl mx-auto">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Apply Now</h2>
                            <p className="text-zinc-400">Fill out the form below and we&apos;ll get in touch</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 border border-white/10 rounded-2xl p-6 md:p-8">
                            {error && (
                                <div className="p-3 text-sm text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-400">
                                    Full Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.fullName}
                                    onChange={(e) => handleChange("fullName", e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-zinc-400">
                                        Phone <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        placeholder="10-digit number"
                                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-zinc-400">
                                        City <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={form.city}
                                        onChange={(e) => handleChange("city", e.target.value)}
                                        placeholder="Your city"
                                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-400">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-400">
                                    Sales Experience (optional)
                                </label>
                                <textarea
                                    value={form.experience}
                                    onChange={(e) => handleChange("experience", e.target.value)}
                                    placeholder="Tell us about any sales or marketing experience you have..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-zinc-400">
                                    Referral Code (if any)
                                </label>
                                <input
                                    type="text"
                                    value={form.referralCode}
                                    onChange={(e) => handleChange("referralCode", e.target.value.toUpperCase())}
                                    placeholder="e.g. PRINCE10"
                                    className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 uppercase"
                                />
                                <p className="text-xs text-zinc-500">
                                    Were you referred by an existing agent? Enter their code.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={!isFormValid || loading}
                                className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-lg transition-all ${isFormValid && !loading
                                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98]"
                                        : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Application <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-zinc-500">
                                By submitting, you agree to be contacted by our team
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

                        <div className="space-y-4">
                            {[
                                {
                                    q: "How much can I earn?",
                                    a: "You earn ₹100+ base commission per card sold. Top agents sell 20+ cards per month, earning ₹2,000+ in commissions alone, plus bonuses."
                                },
                                {
                                    q: "Do I need sales experience?",
                                    a: "No prior experience required! We provide complete training and support to help you succeed."
                                },
                                {
                                    q: "How do I get paid?",
                                    a: "Commissions are paid weekly via UPI or bank transfer. You can request a payout anytime from your dashboard."
                                },
                                {
                                    q: "What training is provided?",
                                    a: "You'll get access to sales scripts, demo cards, marketing materials, and a WhatsApp support group with other agents."
                                }
                            ].map((faq, i) => (
                                <div
                                    key={i}
                                    className="bg-zinc-900/30 border border-white/5 rounded-xl p-5"
                                >
                                    <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-violet-400" />
                                        {faq.q}
                                    </h3>
                                    <p className="text-zinc-400 text-sm pl-6">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
