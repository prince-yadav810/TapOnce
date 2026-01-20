"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, Stethoscope, Camera, Building2, Home, ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState } from "react"

const professions = [
    {
        id: "lawyer",
        title: "The Lawyer",
        icon: Briefcase,
        tagline: "Command respect before you speak.",
        scenario: "You're at a high-stakes networking event. A potential client asks for your card. Instead of fumbling with paper, you hand over a sleek metal card. One tap – and your credentials, case wins, and booking link appear on their phone.",
        benefits: ["Instant credibility", "Direct appointment booking", "Digital portfolio of wins"],
        color: "from-amber-500 to-orange-600",
        bgColor: "bg-amber-500/10"
    },
    {
        id: "doctor",
        title: "The Doctor",
        icon: Stethoscope,
        tagline: "Patients trust you. Now they'll remember you.",
        scenario: "After a successful consultation, your patient wants to refer you to family. With TapOnce, they have your clinic details, appointment link, and social profiles saved permanently – no lost cards.",
        benefits: ["Instant appointment links", "Patient referral made easy", "Professional credibility"],
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-500/10"
    },
    {
        id: "influencer",
        title: "The Influencer",
        icon: Camera,
        tagline: "All your platforms. One tap.",
        scenario: "Brand meeting at a coffee shop. Instead of spelling out your Instagram handle, you tap your card. Boom – YouTube, Instagram, TikTok, media kit, and collab email – all right there.",
        benefits: ["All social links unified", "Media kit instantly shared", "Brand collaboration ready"],
        color: "from-pink-500 to-rose-600",
        bgColor: "bg-pink-500/10"
    },
    {
        id: "ceo",
        title: "The CEO",
        icon: Building2,
        tagline: "First impressions that match your position.",
        scenario: "Board meeting. Investor dinner. Every interaction matters. Your TapOnce card isn't just contact info – it's a statement. Premium metal, custom engraving, and a digital presence that reflects your status.",
        benefits: ["Premium positioning", "Investor-ready profile", "Team card management"],
        color: "from-violet-500 to-purple-600",
        bgColor: "bg-violet-500/10"
    },
    {
        id: "broker",
        title: "The Property Broker",
        icon: Home,
        tagline: "Close deals faster. Share listings instantly.",
        scenario: "Site visit ends. Client is interested. One tap – they have your WhatsApp, current listings with photos, and virtual tour links. No follow-up needed. The deal moves forward.",
        benefits: ["Property listings shared", "WhatsApp integration", "Virtual tour links"],
        color: "from-blue-500 to-cyan-600",
        bgColor: "bg-blue-500/10"
    }
]

export default function ProfessionShowcase() {
    const [active, setActive] = useState(0)

    const next = () => setActive((prev) => (prev + 1) % professions.length)
    const prev = () => setActive((prev) => (prev - 1 + professions.length) % professions.length)

    const current = professions[active]

    return (
        <section className="py-24 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                        Built for <span className="text-violet-400">Your Industry</span>
                    </h2>
                    <p className="text-zinc-400 max-w-lg mx-auto">
                        See how professionals like you are using TapOnce to stand out.
                    </p>
                </div>

                {/* Profession Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {professions.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => setActive(i)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all ${i === active
                                    ? `bg-gradient-to-r ${p.color} text-white border-transparent shadow-lg`
                                    : "bg-zinc-900/50 text-zinc-400 border-white/10 hover:border-white/20"
                                }`}
                        >
                            <p.icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{p.title.replace("The ", "")}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="relative max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`rounded-3xl border border-white/10 p-8 md:p-12 ${current.bgColor}`}
                        >
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                {/* Left: Story */}
                                <div className="space-y-6">
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${current.color} text-white font-medium`}>
                                        <current.icon className="h-5 w-5" />
                                        {current.title}
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                        {current.tagline}
                                    </h3>

                                    <p className="text-zinc-300 leading-relaxed text-lg">
                                        {current.scenario}
                                    </p>

                                    <ul className="space-y-3">
                                        {current.benefits.map((b, i) => (
                                            <li key={i} className="flex items-center gap-3 text-white">
                                                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${current.color}`} />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right: Card Visual */}
                                <div className="flex justify-center">
                                    <motion.div
                                        initial={{ rotateY: -15, rotateX: 10 }}
                                        animate={{ rotateY: 0, rotateX: 0 }}
                                        className="relative w-[280px] h-[180px] md:w-[340px] md:h-[214px] rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden preserve-3d"
                                    >
                                        {/* Gradient Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${current.color} opacity-20`} />

                                        {/* Content */}
                                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                            <div className="flex justify-between">
                                                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${current.color} flex items-center justify-center`}>
                                                    <current.icon className="h-5 w-5 text-white" />
                                                </div>
                                                <div className="text-[10px] text-white/30 uppercase tracking-widest">TapOnce</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold text-white">{current.title.replace("The ", "")}</div>
                                                <div className="text-xs text-white/50">Founder Edition</div>
                                            </div>
                                        </div>

                                        {/* Texture */}
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </section>
    )
}
