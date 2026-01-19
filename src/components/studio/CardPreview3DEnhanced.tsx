"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
    Scale, Stethoscope, Building2, Palette, Home, Camera, Briefcase,
    Activity, Dna, Smile, Crown, Rocket, TrendingUp, Pencil,
    Zap, Film, Key, TreePine, Heart, Play, Sparkles, Mic, Gamepad2,
    ScrollText, Building, RotateCcw
} from "lucide-react"
import React, { useState, useRef } from "react"
import { CardTemplate } from "@/data/cardTemplates"

interface CardPreview3DProps {
    template: CardTemplate | null
    material: "metal" | "pvc" | "wood"
    name: string
    title: string
    logoUrl?: string
}

const materialStyles = {
    metal: {
        texture: "bg-gradient-to-br from-zinc-800 via-zinc-900 to-black",
        noise: true,
        label: "MATTE BLACK METAL"
    },
    pvc: {
        texture: "bg-gradient-to-br from-slate-900 via-slate-950 to-black",
        noise: false,
        label: "PREMIUM PVC"
    },
    wood: {
        texture: "bg-gradient-to-br from-amber-900 via-yellow-950 to-black",
        noise: true,
        label: "ECO WALNUT"
    }
}

const fontFamilies: Record<string, string> = {
    "font-serif": "'Georgia', serif",
    "font-sans": "'Inter', sans-serif",
    "font-mono": "'Fira Code', monospace"
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Scale, Stethoscope, Building2, Palette, Home, Camera, Briefcase,
    Activity, Dna, Smile, Crown, Rocket, TrendingUp, Pencil,
    Zap, Film, Key, TreePine, Heart, Play, Sparkles, Mic, Gamepad2,
    ScrollText, Building, Cross: Briefcase, Gavel: Scale
}

export default function CardPreview3DEnhanced({
    template,
    material,
    name,
    title,
    logoUrl
}: CardPreview3DProps) {
    const [isFlipped, setIsFlipped] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    // Mouse tracking for parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    const style = materialStyles[material]
    const IconComponent = template ? (iconMap[template.icon] || Briefcase) : Briefcase

    // Empty state
    if (!template) {
        return (
            <div className="flex flex-col items-center gap-6">
                <div className="relative w-[320px] h-[200px] md:w-[380px] md:h-[238px] rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center bg-zinc-900/30">
                    <div className="text-center">
                        <div className="h-12 w-12 mx-auto mb-3 rounded-xl bg-white/5 flex items-center justify-center">
                            <Palette className="h-6 w-6 text-zinc-500" />
                        </div>
                        <p className="text-zinc-500 text-sm">Select a style to preview</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Card Container */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative perspective-1000"
                style={{ perspective: "1000px" }}
            >
                {/* Glow Effect */}
                <motion.div
                    className={`absolute -inset-10 rounded-full blur-[80px] opacity-30`}
                    style={{ background: `linear-gradient(135deg, ${template.accentColor === 'amber' ? '#f59e0b' : template.accentColor === 'emerald' ? '#10b981' : template.accentColor === 'violet' ? '#8b5cf6' : '#6366f1'} 0%, transparent 100%)` }}
                />

                {/* Card */}
                <motion.div
                    style={{
                        rotateX: isFlipped ? 0 : rotateX,
                        rotateY: isFlipped ? 180 : rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="relative w-[320px] h-[200px] md:w-[380px] md:h-[238px] cursor-pointer"
                >
                    {/* Front Side */}
                    <motion.div
                        className={`absolute inset-0 rounded-2xl border border-white/10 shadow-2xl overflow-hidden backface-hidden`}
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {/* Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient}`} />

                        {/* Material Texture */}
                        {style.noise && (
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                        )}

                        {/* Content */}
                        <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                            {/* Top Row */}
                            <div className="flex justify-between items-start">
                                {/* Logo */}
                                <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                                    {logoUrl ? (
                                        <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <IconComponent className="h-6 w-6 text-white/40" />
                                    )}
                                </div>

                                {/* NFC Icon */}
                                <div className="flex items-center gap-2">
                                    <svg className="w-6 h-6 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
                                    </svg>
                                </div>
                            </div>

                            {/* Bottom Row */}
                            <div>
                                <h3
                                    className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase leading-tight"
                                    style={{ fontFamily: template ? fontFamilies[template.fontFamily] : undefined }}
                                >
                                    {name || "YOUR NAME"}
                                </h3>
                                <p
                                    className="text-xs md:text-sm text-white/60 tracking-widest uppercase mt-1"
                                    style={{ fontFamily: template ? fontFamilies[template.fontFamily] : undefined }}
                                >
                                    {title || "Your Title"}
                                </p>
                            </div>

                            {/* Watermark Icon */}
                            {template.iconPosition === "watermark" && (
                                <div className="absolute right-4 bottom-4 opacity-10">
                                    <IconComponent className="h-20 w-20 text-white" />
                                </div>
                            )}
                        </div>

                        {/* Material Badge */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] text-white/30 tracking-widest uppercase">
                            {style.label}
                        </div>

                        {/* Shine Effect */}
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: "200%", opacity: [0, 0.4, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 pointer-events-none"
                        />
                    </motion.div>

                    {/* Back Side */}
                    <motion.div
                        className={`absolute inset-0 rounded-2xl border border-white/10 shadow-2xl overflow-hidden`}
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                        {/* Background */}
                        <div className={`absolute inset-0 ${style.texture}`} />

                        {/* Texture */}
                        {style.noise && (
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
                        )}

                        {/* QR Code Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="h-24 w-24 md:h-28 md:w-28 mx-auto mb-3 bg-white rounded-xl flex items-center justify-center">
                                    <div className="grid grid-cols-5 gap-0.5 p-2">
                                        {Array.from({ length: 25 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-3 w-3 ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-white/40 text-xs uppercase tracking-widest">Scan to Connect</p>
                            </div>
                        </div>

                        {/* TapOnce Branding */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-[10px] tracking-widest uppercase">
                            TapOnce.in
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
            >
                <RotateCcw className="h-4 w-4" />
                {isFlipped ? "View Front" : "View Back"}
            </button>

            {/* Hint */}
            <p className="text-zinc-600 text-xs text-center">
                Move mouse to tilt • Click to flip • Updates in real-time
            </p>
        </div>
    )
}
