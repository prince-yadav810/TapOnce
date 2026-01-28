"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield, Truck, RotateCcw } from "lucide-react"
import Link from "next/link"
import React from "react"

const trustBadges = [
    { icon: Truck, label: "Free Shipping" },
    { icon: RotateCcw, label: "30-Day Returns" },
    { icon: Shield, label: "Lifetime Warranty" }
]

export default function FinalCTA() {
    return (
        <section className="py-32 bg-[#030303] relative overflow-hidden">
            {/* Dramatic Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-violet-600/10 via-purple-600/5 to-cyan-600/10 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Main Headline */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                        Ready to Make Every{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">
                            Introduction Count?
                        </span>
                    </h2>

                    <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                        Join thousands of professionals who have upgraded their first impression.
                        Your premium card ships in 48 hours.
                    </p>

                    {/* CTA Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block mb-12"
                    >
                        <Link
                            href="/order"
                            className="group relative inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-full text-xl font-bold transition-all hover:bg-zinc-100"
                        >
                            Get Your Card Now
                            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />

                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-full bg-white/50 blur-xl opacity-0 group-hover:opacity-50 transition-opacity -z-10" />
                        </Link>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-8"
                    >
                        {trustBadges.map((badge, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-zinc-400"
                            >
                                <badge.icon className="h-5 w-5 text-emerald-400" />
                                <span className="text-sm font-medium">{badge.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Secondary Action */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-8"
                    >
                        <Link
                            href="#how-it-works"
                            className="text-sm text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
                        >
                            Still have questions? See how it works →
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
