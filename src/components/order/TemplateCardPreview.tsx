"use client"

import { motion } from "framer-motion"
import {
    Scale, Stethoscope, Building2, Palette, Home, Camera, Briefcase,
    Activity, Dna, Smile, Crown, Rocket, TrendingUp, Pencil,
    Zap, Film, Key, TreePine, Heart, Play, Sparkles, Mic, Gamepad2,
    ScrollText, Building
} from "lucide-react"
import React from "react"
import { CardTemplate } from "@/data/cardTemplates"

interface TemplateCardPreviewProps {
    template: CardTemplate | null
    material: "metal" | "pvc" | "wood"
    name: string
    title: string
    logoUrl?: string
}

const materialOverlays = {
    metal: "bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30",
    pvc: "",
    wood: "bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40"
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

export default function TemplateCardPreview({
    template,
    material,
    name,
    title,
    logoUrl
}: TemplateCardPreviewProps) {
    if (!template) {
        return (
            <div className="relative perspective-1000">
                <div className="relative w-[320px] h-[200px] md:w-[400px] md:h-[250px] rounded-2xl border border-dashed border-white/20 flex items-center justify-center">
                    <p className="text-zinc-500 text-center">
                        Select a template<br />to preview
                    </p>
                </div>
            </div>
        )
    }

    // Get icon component
    const IconComponent = iconMap[template.icon] || Briefcase

    return (
        <div className="relative perspective-1000">
            {/* Glow Behind */}
            <div className={`absolute -inset-10 bg-gradient-to-br ${template.gradient} blur-[80px] opacity-40 rounded-full`} />

            {/* Card */}
            <motion.div
                initial={{ rotateY: 0, rotateX: 0 }}
                whileHover={{ rotateY: 8, rotateX: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`relative w-[320px] h-[200px] md:w-[400px] md:h-[250px] rounded-2xl border border-white/10 shadow-2xl overflow-hidden preserve-3d cursor-pointer`}
            >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient}`} />

                {/* Material Texture */}
                <div className={`absolute inset-0 ${materialOverlays[material]} mix-blend-overlay`} />

                {/* Content based on layout */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Row */}
                    <div className="flex justify-between items-start">
                        {/* Logo/Avatar */}
                        {template.iconPosition === "top-left" ? (
                            <div className={`h-12 w-12 rounded-xl bg-${template.accentColor}-500/20 border border-${template.accentColor}-500/30 flex items-center justify-center`}>
                                <IconComponent className={`h-6 w-6 text-${template.accentColor}-400`} />
                            </div>
                        ) : (
                            <div className="h-14 w-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                                {logoUrl ? (
                                    <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-white/30 text-[10px] text-center">LOGO</div>
                                )}
                            </div>
                        )}

                        {/* Icon on right */}
                        {template.iconPosition === "top-right" && (
                            <div className={`h-10 w-10 rounded-xl bg-${template.accentColor}-500/20 border border-${template.accentColor}-500/30 flex items-center justify-center`}>
                                <IconComponent className={`h-5 w-5 text-${template.accentColor}-400`} />
                            </div>
                        )}

                        {template.iconPosition !== "top-right" && template.iconPosition !== "top-left" && (
                            <div className="text-white/20">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Bottom Row */}
                    <div>
                        <h3
                            className={`text-xl md:text-2xl font-bold text-white tracking-wide uppercase ${template.fontFamily}`}
                            style={{ fontFamily: fontFamilies[template.fontFamily] }}
                        >
                            {name || "YOUR NAME"}
                        </h3>
                        <p
                            className={`text-sm text-white/60 tracking-widest uppercase mt-1 ${template.fontFamily}`}
                            style={{ fontFamily: fontFamilies[template.fontFamily] }}
                        >
                            {title || "Your Title"}
                        </p>
                    </div>

                    {/* Watermark Icon */}
                    {template.iconPosition === "watermark" && (
                        <div className="absolute right-4 bottom-4 opacity-10">
                            <IconComponent className="h-24 w-24 text-white" />
                        </div>
                    )}

                    {/* Bottom Right Icon */}
                    {template.iconPosition === "bottom-right" && (
                        <div className={`absolute right-4 bottom-4 h-10 w-10 rounded-xl bg-${template.accentColor}-500/20 border border-${template.accentColor}-500/30 flex items-center justify-center`}>
                            <IconComponent className={`h-5 w-5 text-${template.accentColor}-400`} />
                        </div>
                    )}
                </div>

                {/* Template Label */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] text-white/40 tracking-widest uppercase">
                    {template.name}
                </div>

                {/* Shine Effect */}
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "200%", opacity: [0, 0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
                />
            </motion.div>

            {/* Reflection */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-gradient-to-b from-white/5 to-transparent blur-xl rounded-full" />
        </div>
    )
}
