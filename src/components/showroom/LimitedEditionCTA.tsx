"use client"

import { motion } from "framer-motion"
import { ArrowRight, Award, Clock, Shield } from "lucide-react"
import Link from "next/link"
import React, { useState, useEffect } from "react"

export default function LimitedEditionCTA() {
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 41 })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev
                if (seconds > 0) {
                    seconds--
                } else if (minutes > 0) {
                    minutes--
                    seconds = 59
                } else if (hours > 0) {
                    hours--
                    minutes = 59
                    seconds = 59
                }
                return { hours, minutes, seconds }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (n: number) => n.toString().padStart(2, "0")

    return (
        <section className="py-20 bg-gradient-to-br from-violet-950 via-[#0A0A0A] to-purple-950 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm mb-8"
                    >
                        <Award className="h-4 w-4" />
                        FOUNDER EDITION – LIMITED TO 500 CARDS
                    </motion.div>

                    <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
                    >
                        Exclusive. Numbered.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Yours Forever.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto"
                    >
                        Be among the first 500 to own a laser-engraved, individually numbered Founder Edition card. Premium metal. Premium packaging. Lifetime bragging rights.
                    </motion.p>

                    {/* Countdown */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-4 mb-12"
                    >
                        <div className="flex items-center gap-2 text-zinc-400">
                            <Clock className="h-5 w-5" />
                            <span>Offer ends in:</span>
                        </div>
                        <div className="flex gap-2">
                            {[
                                { label: "HRS", value: timeLeft.hours },
                                { label: "MIN", value: timeLeft.minutes },
                                { label: "SEC", value: timeLeft.seconds },
                            ].map((t, i) => (
                                <div key={i} className="text-center">
                                    <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-2xl font-mono font-bold text-white">
                                        {formatTime(t.value)}
                                    </div>
                                    <div className="text-[10px] text-zinc-500 mt-1">{t.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            href="/register"
                            className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-orange-500/20"
                        >
                            Claim Your Founder Card
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-zinc-400"
                    >
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-emerald-400" />
                            Lifetime Warranty
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-emerald-400" />
                            Free Shipping
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-emerald-400" />
                            30-Day Returns
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
