"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Users, TrendingUp, ShieldCheck } from "lucide-react"
import React, { useRef } from "react"

export default function BusinessSolutions() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // 3D Tilt Effect
    const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

    return (
        <section ref={containerRef} id="business" className="py-32 bg-[#050505] text-white overflow-hidden perspective-1000">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="space-y-8 z-10">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.1]">
                            Scale your team with<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Enterprise Control</span>
                        </h2>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            Manage thousands of digital cards from a single dashboard. Lock brand styles, track team performance, and integrate with your HR/CRM systems.
                        </p>

                        <div className="space-y-6 pt-8">
                            {[
                                {
                                    icon: Users,
                                    title: "Centralized Management",
                                    desc: "Create, edit, and deactivate employee cards instantly."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Team Analytics",
                                    desc: "Measure ROI and networking effectiveness across departments."
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "SSO & Security",
                                    desc: "Enterprise-grade security with SOC2 compliance."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                                        <item.icon className="h-6 w-6 text-violet-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">{item.title}</h4>
                                        <p className="text-zinc-500">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 3D Dashboard Mockup */}
                    <motion.div
                        style={{ rotateX, scale, opacity }}
                        className="relative"
                    >
                        <div className="relative rounded-xl bg-[#111] border border-white/10 shadow-2xl overflow-hidden aspect-video transform-gpu preserve-3d">
                            {/* Header */}
                            <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="h-3 w-3 rounded-full bg-red-500/20" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500/20" />
                                    <div className="h-3 w-3 rounded-full bg-green-500/20" />
                                </div>
                                <div className="ml-4 h-6 w-64 rounded bg-white/5" />
                            </div>

                            {/* Body */}
                            <div className="p-6 grid grid-cols-3 gap-6">
                                {/* Sidebar */}
                                <div className="col-span-1 space-y-3">
                                    <div className="h-8 w-full rounded bg-violet-500/20" />
                                    <div className="h-4 w-3/4 rounded bg-white/5" />
                                    <div className="h-4 w-3/4 rounded bg-white/5" />
                                    <div className="h-4 w-3/4 rounded bg-white/5" />
                                </div>

                                {/* Content */}
                                <div className="col-span-2 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-24 rounded bg-white/5 border border-white/10 p-4">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 mb-2" />
                                            <div className="h-3 w-16 bg-white/10 rounded" />
                                        </div>
                                        <div className="h-24 rounded bg-white/5 border border-white/10 p-4">
                                            <div className="h-8 w-8 rounded bg-white/10 mb-6" />
                                            <div className="h-3 w-16 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                    <div className="h-32 w-full rounded bg-white/5 border border-white/10" />
                                    <div className="space-y-2">
                                        <div className="h-10 w-full rounded bg-white/5 border border-white/10" />
                                        <div className="h-10 w-full rounded bg-white/5 border border-white/10" />
                                    </div>
                                </div>
                            </div>

                            {/* Shine overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Glow Behind */}
                        <div className="absolute -inset-10 bg-violet-600/30 blur-3xl rounded-full z-[-1] opacity-50" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
