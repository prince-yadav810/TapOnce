"use client"

import { motion } from "framer-motion"
import { BarChart3, CreditCard, Globe, Lock, Palette, Smartphone, Zap } from "lucide-react"
import React from "react"

const features = [
    {
        title: "Instant Sharing",
        description: "Share contact info, social links, and files with a single tap using NFC technology.",
        icon: Zap,
        className: "md:col-span-2",
        color: "from-violet-500 to-purple-500"
    },
    {
        title: "Custom Design",
        description: "Fully fully customizable card designs to match your brand identity.",
        icon: Palette,
        className: "md:col-span-1",
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Analytics Dashboard",
        description: "Track taps, views, and engagement with detailed real-time analytics.",
        icon: BarChart3,
        className: "md:col-span-1",
        color: "from-emerald-500 to-green-500"
    },
    {
        title: "Cross Platform",
        description: "Works seamlessly on both iOS and Android devices without any app installation.",
        icon: Smartphone,
        className: "md:col-span-2",
        color: "from-orange-500 to-red-500"
    },
    {
        title: "Secure & Private",
        description: "Bank-grade security ensures your data is always protected.",
        icon: Lock,
        className: "md:col-span-1",
        color: "from-pink-500 to-rose-500"
    },
    {
        title: "Global CDN",
        description: "Lightning fast profile loading speeds from anywhere in the world.",
        icon: Globe,
        className: "md:col-span-2",
        color: "from-indigo-500 to-blue-500"
    }
]

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-[#0A0A0A] text-white">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center space-y-4"
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Premium Features for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                            Modern Networking
                        </span>
                    </h2>
                    <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
                        Everything you need to make a lasting impression and grow your professional network.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 ${feature.className} hover:bg-white/10 transition-colors`}
                        >
                            <div className="relative z-10 space-y-4">
                                <div className={`inline-flex rounded-xl p-3 bg-gradient-to-br ${feature.color} bg-opacity-10`}>
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold">{feature.title}</h3>
                                <p className="text-zinc-400">{feature.description}</p>
                            </div>

                            {/* Gradient Bloom Effect on Hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
