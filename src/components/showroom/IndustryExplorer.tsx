"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    Briefcase, Stethoscope, Camera, Building2, Home,
    Palette, GraduationCap, Mic2, Dumbbell, Utensils,
    Plane, Scissors, ArrowRight, Search
} from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

const industries = [
    {
        id: "legal",
        name: "Legal & Law",
        icon: Briefcase,
        color: "from-amber-500 to-orange-600",
        description: "For advocates, lawyers, and legal consultants",
        templates: ["Corporate Lawyer", "Criminal Defense", "Legal Consultant"],
        tagline: "Command respect in the courtroom and beyond."
    },
    {
        id: "medical",
        name: "Healthcare",
        icon: Stethoscope,
        color: "from-emerald-500 to-teal-600",
        description: "For doctors, dentists, and medical professionals",
        templates: ["General Physician", "Specialist Doctor", "Dental Practice"],
        tagline: "Patients trust you. Now they'll remember you."
    },
    {
        id: "creator",
        name: "Content Creator",
        icon: Camera,
        color: "from-pink-500 to-rose-600",
        description: "For influencers, YouTubers, and social media stars",
        templates: ["Lifestyle Influencer", "Tech Reviewer", "Fashion Creator"],
        tagline: "All your platforms. One tap."
    },
    {
        id: "corporate",
        name: "Corporate & CEO",
        icon: Building2,
        color: "from-violet-500 to-purple-600",
        description: "For executives, founders, and business leaders",
        templates: ["Startup Founder", "C-Suite Executive", "Board Member"],
        tagline: "First impressions that match your position."
    },
    {
        id: "realestate",
        name: "Real Estate",
        icon: Home,
        color: "from-blue-500 to-cyan-600",
        description: "For property brokers, agents, and developers",
        templates: ["Property Broker", "Real Estate Developer", "Interior Designer"],
        tagline: "Close deals faster. Share listings instantly."
    },
    {
        id: "creative",
        name: "Creative & Design",
        icon: Palette,
        color: "from-fuchsia-500 to-pink-600",
        description: "For designers, artists, and creative professionals",
        templates: ["Graphic Designer", "UI/UX Designer", "Photographer"],
        tagline: "Let your work speak before you do."
    },
    {
        id: "education",
        name: "Education",
        icon: GraduationCap,
        color: "from-indigo-500 to-blue-600",
        description: "For teachers, coaches, and educational institutions",
        templates: ["Private Tutor", "Course Instructor", "Academic Institution"],
        tagline: "Share knowledge, not just contact info."
    },
    {
        id: "entertainment",
        name: "Entertainment",
        icon: Mic2,
        color: "from-red-500 to-orange-600",
        description: "For musicians, DJs, and event performers",
        templates: ["Music Artist", "DJ & Events", "Stand-up Comedian"],
        tagline: "Make every introduction memorable."
    },
    {
        id: "fitness",
        name: "Fitness & Wellness",
        icon: Dumbbell,
        color: "from-lime-500 to-green-600",
        description: "For trainers, yoga instructors, and wellness coaches",
        templates: ["Personal Trainer", "Yoga Instructor", "Nutritionist"],
        tagline: "Transform bodies and connections."
    },
    {
        id: "hospitality",
        name: "Food & Hospitality",
        icon: Utensils,
        color: "from-orange-500 to-amber-600",
        description: "For chefs, restaurant owners, and caterers",
        templates: ["Restaurant Owner", "Chef", "Catering Service"],
        tagline: "Serve great food and greater impressions."
    },
    {
        id: "travel",
        name: "Travel & Tourism",
        icon: Plane,
        color: "from-sky-500 to-blue-600",
        description: "For travel agents, tour operators, and hospitality",
        templates: ["Travel Agent", "Tour Operator", "Hotel Manager"],
        tagline: "Take them on a journey from the first tap."
    },
    {
        id: "beauty",
        name: "Beauty & Salon",
        icon: Scissors,
        color: "from-rose-400 to-pink-500",
        description: "For beauticians, salon owners, and makeup artists",
        templates: ["Salon Owner", "Makeup Artist", "Hair Stylist"],
        tagline: "Beauty is in the details."
    }
]

export default function IndustryExplorer() {
    const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredIndustries = industries.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <section id="industries" className="py-24 bg-[#050505]">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
                        Built for <span className="text-violet-400">Your Industry</span>
                    </h2>
                    <p className="text-xl text-zinc-400 mb-8">
                        Select your profession to explore pre-designed templates tailored to your field. Customize and order in minutes.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search your industry..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-white/10 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Industry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                    {filteredIndustries.map((industry) => (
                        <motion.button
                            key={industry.id}
                            onClick={() => setSelectedIndustry(selectedIndustry?.id === industry.id ? null : industry)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-6 rounded-2xl border transition-all text-left group ${selectedIndustry?.id === industry.id
                                    ? `bg-gradient-to-br ${industry.color} border-transparent`
                                    : "bg-zinc-900/50 border-white/5 hover:border-white/10"
                                }`}
                        >
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${selectedIndustry?.id === industry.id
                                    ? "bg-white/20"
                                    : `bg-gradient-to-br ${industry.color} opacity-80`
                                }`}>
                                <industry.icon className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="font-bold text-white mb-1">{industry.name}</h3>
                            <p className={`text-sm ${selectedIndustry?.id === industry.id ? "text-white/80" : "text-zinc-500"}`}>
                                {industry.templates.length} templates
                            </p>
                        </motion.button>
                    ))}
                </div>

                {/* Selected Industry Details */}
                <AnimatePresence mode="wait">
                    {selectedIndustry && (
                        <motion.div
                            key={selectedIndustry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`rounded-3xl border border-white/10 p-8 md:p-12 bg-gradient-to-br ${selectedIndustry.color} bg-opacity-10`}
                            style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)` }}
                        >
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                {/* Left: Info */}
                                <div className="space-y-6">
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${selectedIndustry.color} text-white font-medium`}>
                                        <selectedIndustry.icon className="h-5 w-5" />
                                        {selectedIndustry.name}
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                        {selectedIndustry.tagline}
                                    </h3>

                                    <p className="text-lg text-zinc-300">
                                        {selectedIndustry.description}. Choose from our professionally designed templates and make it your own.
                                    </p>

                                    <div className="space-y-3">
                                        <p className="text-sm text-zinc-400 font-medium">Available Templates:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedIndustry.templates.map((template) => (
                                                <span key={template} className="px-3 py-1.5 bg-white/10 text-white text-sm rounded-full border border-white/10">
                                                    {template}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/templates?industry=${selectedIndustry.id}`}
                                        className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${selectedIndustry.color} text-white rounded-full font-bold hover:scale-105 transition-transform`}
                                    >
                                        Explore {selectedIndustry.name} Templates
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>

                                {/* Right: Template Preview Cards */}
                                <div className="relative h-[300px] md:h-[400px]">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Stacked Card Previews */}
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8, rotate: -5 + i * 5 }}
                                                animate={{
                                                    opacity: 1 - i * 0.2,
                                                    scale: 1 - i * 0.05,
                                                    rotate: -5 + i * 5,
                                                    x: i * 20,
                                                    y: i * -10
                                                }}
                                                transition={{ delay: i * 0.1 }}
                                                className="absolute w-[200px] h-[126px] md:w-[280px] md:h-[176px] rounded-xl bg-[#0A0A0A] border border-white/10 shadow-2xl overflow-hidden"
                                            >
                                                {/* Gradient */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${selectedIndustry.color} opacity-20`} />

                                                {/* Content */}
                                                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                                                    <div className="flex justify-between items-start">
                                                        <div className={`h-8 w-8 rounded bg-gradient-to-br ${selectedIndustry.color} flex items-center justify-center`}>
                                                            <selectedIndustry.icon className="h-4 w-4 text-white" />
                                                        </div>
                                                        <span className="text-[8px] text-white/30 uppercase">TapOnce</span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-white">{selectedIndustry.templates[i]}</div>
                                                        <div className="text-[10px] text-white/50">Template Preview</div>
                                                    </div>
                                                </div>

                                                {/* Texture */}
                                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CTA for non-selected state */}
                {!selectedIndustry && (
                    <div className="text-center mt-8">
                        <p className="text-zinc-500">
                            Don't see your industry? <Link href="/contact" className="text-violet-400 hover:underline">Contact us</Link> for a custom template.
                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
