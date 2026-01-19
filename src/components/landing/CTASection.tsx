"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import React, { useRef } from "react"

export default function CTASection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -100])

    return (
        <section
            ref={containerRef}
            className="relative py-32 bg-[#0A0A0A] overflow-hidden flex items-center justify-center"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-violet-950/20 pointer-events-none" />

            <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px]" />
            </motion.div>

            <div className="container relative z-10 px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                        Ready to Upgrade Your Network?
                    </h2>
                    <p className="mx-auto max-w-[600px] text-zinc-400 md:text-xl">
                        Join thousands of professionals who have switched to TapOnce.
                        The future of networking is here.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link
                            href="/login?redirect=/agent/orders/new"
                            className="group relative inline-flex h-16 items-center justify-center rounded-full bg-white px-10 text-lg font-bold text-black transition-all hover:bg-zinc-100"
                        >
                            Get Your Card
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 -z-10 rounded-full bg-white blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
