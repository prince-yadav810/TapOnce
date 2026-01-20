"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import React, { useRef } from "react"

export default function HeroSection() {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
    const position = useTransform(scrollYProgress, [0, 0.5], [0, -50])

    return (
        <section
            ref={targetRef}
            className="relative min-h-[90vh] w-full overflow-hidden bg-[#0A0A0A] text-white flex items-center justify-center pt-20"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
            </div>

            <motion.div
                style={{ opacity, scale, y: position }}
                className="container relative z-10 mx-auto px-4 md:px-6"
            >
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 backdrop-blur-xl"
                            >
                                <Sparkles className="mr-2 h-4 w-4 text-violet-400" />
                                <span className="text-xs font-medium tracking-wide uppercase">
                                    Next Gen Networking
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/50"
                            >
                                Share your world with a{" "}
                                <span className="text-violet-400">Tap</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="max-w-[600px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                            >
                                The premium digital business card that defines your
                                professional identity. Elegant, contactless, and unforgettable.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col gap-4 sm:flex-row"
                        >
                            <Link
                                href="/login?redirect=/agent/orders/new"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-black transition-transform hover:scale-105 hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                Order Now
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            <Link
                                href="#features"
                                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring backdrop-blur-sm"
                            >
                                Watch Demo
                            </Link>
                        </motion.div>
                    </div>

                    <div className="flex items-center justify-center perspective-[1000px]">
                        {/* 3D Floating Card Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateX: 20, rotateY: -20 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
                            transition={{
                                duration: 1.5,
                                ease: "easeOut",
                                type: "spring",
                                stiffness: 50
                            }}
                            whileHover={{
                                scale: 1.05,
                                rotateY: 5,
                                transition: { duration: 0.3 }
                            }}
                            className="relative h-[300px] w-[500px] md:h-[400px] md:w-[650px] preserve-3d"
                        >
                            {/* The Card Itself */}
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    rotateZ: [0, 1, 0, -1, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl"
                                style={{
                                    transformStyle: "preserve-3d",
                                    boxShadow: "0 0 50px -12px rgba(124, 58, 237, 0.25)"
                                }}
                            >
                                {/* Card Content (Mockup) */}
                                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                                    <div className="flex justify-between items-start">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 opacity-80" />
                                        <div className="h-4 w-20 rounded-full bg-white/10" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-6 w-48 rounded-lg bg-gradient-to-r from-white/80 to-white/20" />
                                        <div className="h-4 w-32 rounded-lg bg-white/10" />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10" />
                                        <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10" />
                                        <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10" />
                                    </div>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Floating Elements behind/around */}
                            <motion.div
                                animate={{ y: [0, 30, 0], x: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                className="absolute -top-12 -right-12 h-24 w-24 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 blur-xl opacity-40 z-[-1]"
                            />
                            <motion.div
                                animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
                                transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
                                className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-blue-600 blur-2xl opacity-20 z-[-1]"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
