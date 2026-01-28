"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { ArrowRight, Sparkles, Layers, CreditCard, Smartphone } from "lucide-react"
import Link from "next/link"
import React, { useRef, useState, useEffect } from "react"

export default function ShowroomHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isExploded, setIsExploded] = useState(false)

    // Mouse Physics
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - left) / width - 0.5
        const y = (e.clientY - top) / height - 0.5
        mouseX.set(x)
        mouseY.set(y)
    }

    // Smooth physics springs
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 20, stiffness: 100 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 20, stiffness: 100 })

    // Parallax layers
    const layer1X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { damping: 30, stiffness: 90 })
    const layer1Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { damping: 30, stiffness: 90 })

    const layer2X = useSpring(useTransform(mouseX, [-0.5, 0.5], [-40, 40]), { damping: 30, stiffness: 90 })
    const layer2Y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-40, 40]), { damping: 30, stiffness: 90 })

    // Aurora Gradient Animation
    const auroraX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]), { damping: 100, stiffness: 20 })

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                setIsHovering(false)
                mouseX.set(0)
                mouseY.set(0)
            }}
            className="relative min-h-[110vh] w-full overflow-hidden bg-[#030303] text-white flex items-center justify-center pt-20 perspective-2000"
        >
            {/* --- Living Aurora Background --- */}
            <div className="absolute inset-0 z-0 opacity-40">
                <motion.div
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,#000000_0deg,#1a0b2e_60deg,#2e1065_120deg,#000000_180deg,#0f172a_240deg,#1e1b4b_300deg,#000000_360deg)] blur-[100px]"
                />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] opacity-[0.03]" />

            <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center px-4 md:px-6">

                {/* --- Left: Typography & Controls --- */}
                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">10,000+ Cards Delivered</span>
                    </motion.div>

                    <div className="space-y-2 relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95]"
                        >
                            Your First<br />
                            Impression,{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">
                                Elevated
                            </span>
                        </motion.h1>

                        {/* Interactive underline that moves with mouse */}
                        <motion.div
                            style={{ width: useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]) }}
                            className="h-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full max-w-md opacity-50 blur-sm"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-zinc-400 max-w-lg leading-relaxed"
                    >
                        The premium NFC business card that defines your professional identity.
                        One tap shares everything—contact, socials, portfolio. No app needed.
                    </motion.p>

                    {/* Dual CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link
                            href="/order"
                            className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-all active:scale-95"
                        >
                            Design Your Card
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            onClick={() => setIsExploded(!isExploded)}
                            className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all"
                        >
                            <Layers className="h-5 w-5" />
                            {isExploded ? "Implode View" : "Explore Card"}
                        </button>
                    </motion.div>

                    {/* Social Proof Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="flex flex-wrap gap-8 pt-4 border-t border-white/5"
                    >
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">10K+</div>
                            <div className="text-xs text-zinc-500">Cards Delivered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">130+</div>
                            <div className="text-xs text-zinc-500">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">4.9★</div>
                            <div className="text-xs text-zinc-500">Rating</div>
                        </div>
                    </motion.div>
                </div>

                {/* --- Right: The Prism / 3D Object --- */}
                <div className="relative h-[600px] flex items-center justify-center perspective-1000">
                    <motion.div
                        style={{ rotateX, rotateY, z: 100 }}
                        className="relative w-[340px] h-[520px] md:w-[420px] md:h-[640px] preserve-3d cursor-grab active:cursor-grabbing"
                        animate={{
                            rotateZ: isExploded ? 10 : 0,
                            scale: isExploded ? 0.9 : 1
                        }}
                    >
                        {/* 
                            Layer 0: Shadows/Glow 
                        */}
                        <motion.div
                            style={{ x: layer2X, y: layer2Y }}
                            className="absolute inset-0 bg-violet-600/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none"
                        />

                        {/* 
                            Layer 1: Backplate (Matte Black Metal)
                        */}
                        <motion.div
                            className="absolute inset-0 rounded-[40px] bg-[#0A0A0A] border border-white/5 shadow-2xl overflow-hidden preserve-3d"
                            animate={{ z: isExploded ? -100 : 0 }}
                        >
                            {/* Texture */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
                            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-50">
                                <div className="text-[10px] tracking-[0.3em]">SERIES 1 / TITANIUM</div>
                                <div className="h-8 w-8 rounded-full border border-white/20" />
                            </div>
                        </motion.div>

                        {/* 
                            Layer 2: The Core (NFC Chip & Circuitry)
                        */}
                        <motion.div
                            className="absolute inset-4 rounded-[32px] bg-black/50 backdrop-blur-sm border border-white/5 preserve-3d flex items-center justify-center"
                            animate={{ z: isExploded ? 0 : 1, opacity: isExploded ? 1 : 0 }}
                        >
                            <div className="relative w-full h-full border border-dashed border-white/10 rounded-[30px]">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-violet-500/30 flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full border-[20px] border-violet-500/10" />
                                    <div className="absolute w-2 h-2 bg-violet-400 rounded-full animate-ping" />
                                </div>
                                <div className="absolute bottom-10 left-10 font-mono text-xs text-violet-400">NFC-V2 MODULE</div>
                            </div>

                            {/* Connecting Lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                                <path d="M50 50 L80 20" stroke="white" strokeWidth="0.5" />
                                <path d="M50 50 L20 80" stroke="white" strokeWidth="0.5" />
                            </svg>
                        </motion.div>

                        {/* 
                            Layer 3: The Front Glass (UI & Sheen)
                        */}
                        <motion.div
                            className="absolute inset-0 rounded-[40px] border border-white/10 shadow-inner overflow-hidden preserve-3d backface-hidden"
                            style={{
                                background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                                backdropFilter: "blur(2px)"
                            }}
                            animate={{ z: isExploded ? 150 : 2 }}
                        >
                            {/* User Content */}
                            <div className="absolute top-12 left-8">
                                <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                                    <span className="text-3xl font-bold">TC</span>
                                </div>
                            </div>

                            <div className="absolute bottom-12 left-8 space-y-2">
                                <h3 className="text-3xl font-bold tracking-tight">TapOnce<span className="text-violet-400">.</span></h3>
                                <p className="text-sm text-zinc-400 font-medium tracking-wide">FOUNDER EDITION</p>
                            </div>

                            {/* Dynamic Sheen - Follows Mouse */}
                            <motion.div
                                className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay"
                                style={{
                                    background: useMotionTemplate`
                                        radial-gradient(
                                            circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%,
                                            rgba(255,255,255,0.4) 0%,
                                            transparent 50%
                                        )
                                    `
                                }}
                            />

                            {/* Scratches/Texture */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                        </motion.div>

                        {/* 
                            Floating Elements (Orbiting)
                        */}
                        {isExploded && (
                            <>
                                <motion.div
                                    className="absolute -right-12 top-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-xs font-mono text-cyan-400"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    AES-256 ENCRYPTED
                                </motion.div>
                                <motion.div
                                    className="absolute -left-12 bottom-40 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-xs font-mono text-violet-400"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    NFC TYPE 5
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll to Explore</span>
            </motion.div>
        </section>
    )
}
