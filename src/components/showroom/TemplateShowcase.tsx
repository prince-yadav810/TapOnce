"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import React, { useRef, useState } from "react"

// Featured templates that look stunning
const featuredTemplates = [
    {
        id: "corporate-black",
        name: "Executive Black",
        industry: "Corporate",
        gradient: "from-zinc-900 via-zinc-800 to-black",
        accent: "violet",
        tagline: "For leaders who mean business"
    },
    {
        id: "medical-emerald",
        name: "Medical Trust",
        industry: "Healthcare",
        gradient: "from-emerald-900 via-teal-900 to-black",
        accent: "emerald",
        tagline: "Healing hands, lasting impressions"
    },
    {
        id: "creative-gradient",
        name: "Creative Flow",
        industry: "Design",
        gradient: "from-fuchsia-900 via-purple-900 to-black",
        accent: "fuchsia",
        tagline: "Let your work speak first"
    },
    {
        id: "legal-gold",
        name: "Legal Authority",
        industry: "Law",
        gradient: "from-amber-900 via-yellow-900 to-black",
        accent: "amber",
        tagline: "Command respect instantly"
    },
    {
        id: "realestate-blue",
        name: "Property Pro",
        industry: "Real Estate",
        gradient: "from-blue-900 via-cyan-900 to-black",
        accent: "cyan",
        tagline: "Close deals with a tap"
    },
    {
        id: "influencer-pink",
        name: "Creator Canvas",
        industry: "Influencer",
        gradient: "from-pink-900 via-rose-900 to-black",
        accent: "pink",
        tagline: "All your links. One card."
    }
]

const industries = [
    "Corporate", "Healthcare", "Legal", "Real Estate",
    "Influencer", "Design", "Education", "Fitness",
    "Food", "Travel", "Beauty", "Entertainment"
]

export default function TemplateShowcase() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section className="py-24 bg-[#030303] overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <Sparkles className="h-4 w-4 text-violet-400" />
                        <span className="text-sm text-zinc-400">Premium Templates</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6"
                    >
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Perfect Card</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto"
                    >
                        Professionally designed templates for every industry. Hover to preview. Click to customize.
                    </motion.p>
                </div>

                {/* Featured Templates - Horizontal Scroll Gallery */}
                <div ref={containerRef} className="relative mb-16">
                    <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
                        {featuredTemplates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                className="relative flex-shrink-0 snap-center group cursor-pointer"
                            >
                                {/* Card Container */}
                                <motion.div
                                    animate={{
                                        scale: hoveredIndex === index ? 1.05 : 1,
                                        rotateY: hoveredIndex === index ? 5 : 0,
                                        z: hoveredIndex === index ? 50 : 0
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="relative w-[280px] h-[400px] md:w-[320px] md:h-[450px] rounded-3xl overflow-hidden"
                                >
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient}`} />

                                    {/* Noise Texture */}
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />

                                    {/* Card Preview Inside */}
                                    <div className="absolute inset-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden">
                                        <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                            {/* Top */}
                                            <div className="flex justify-between items-start">
                                                <div className={`h-12 w-12 rounded-xl bg-${template.accent}-500/20 border border-${template.accent}-500/30 flex items-center justify-center`}>
                                                    <div className={`h-6 w-6 rounded-full bg-${template.accent}-500`} />
                                                </div>
                                                <div className="text-[10px] text-white/40 uppercase tracking-widest">TapOnce</div>
                                            </div>

                                            {/* Bottom */}
                                            <div>
                                                <div className="h-3 w-24 bg-white/20 rounded mb-2" />
                                                <div className="h-2 w-16 bg-white/10 rounded" />
                                            </div>
                                        </div>

                                        {/* Shine Effect */}
                                        <motion.div
                                            animate={{
                                                x: hoveredIndex === index ? ["0%", "200%"] : "0%",
                                                opacity: hoveredIndex === index ? [0, 0.5, 0] : 0
                                            }}
                                            transition={{ duration: 0.8 }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                        />
                                    </div>

                                    {/* Industry Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white">
                                        {template.industry}
                                    </div>

                                    {/* Glow on Hover */}
                                    <motion.div
                                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                                        className={`absolute -inset-1 bg-${template.accent}-500/30 blur-2xl -z-10`}
                                    />
                                </motion.div>

                                {/* Template Info Below Card */}
                                <div className="mt-6 text-center">
                                    <h3 className="text-lg font-bold text-white mb-1">{template.name}</h3>
                                    <p className="text-sm text-zinc-500">{template.tagline}</p>
                                </div>

                                {/* Explore Button on Hover */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 10 }}
                                    className="absolute bottom-[80px] left-1/2 -translate-x-1/2"
                                >
                                    <Link
                                        href={`/templates/${template.id}`}
                                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                                    >
                                        Customize <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Scroll Hint */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-zinc-500 text-sm">
                        <span>Scroll</span>
                        <ArrowRight className="h-4 w-4 animate-pulse" />
                    </div>
                </div>

                {/* Industry Pills - Quick Access */}
                <div className="text-center">
                    <p className="text-zinc-500 mb-6">Explore templates for:</p>
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {industries.map((industry) => (
                            <Link
                                key={industry}
                                href={`/templates?industry=${industry.toLowerCase()}`}
                                className="px-5 py-2.5 bg-zinc-900/50 border border-white/5 rounded-full text-sm text-zinc-300 hover:bg-zinc-800 hover:border-white/10 transition-all"
                            >
                                {industry}
                            </Link>
                        ))}
                    </div>

                    <Link
                        href="/templates"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-violet-500/20"
                    >
                        View All Templates
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
