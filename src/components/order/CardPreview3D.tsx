"use client"

import { motion } from "framer-motion"
import React from "react"

interface CardPreview3DProps {
    material: "metal" | "pvc" | "wood"
    name: string
    title: string
    logoUrl?: string
}

const materialStyles = {
    metal: {
        gradient: "from-zinc-900 via-zinc-800 to-black",
        texture: "bg-[url('https://grainy-gradients.vercel.app/noise.svg')]",
        border: "border-zinc-700",
        label: "MATTE BLACK METAL"
    },
    pvc: {
        gradient: "from-blue-900 via-indigo-900 to-black",
        texture: "",
        border: "border-blue-700",
        label: "PREMIUM PVC"
    },
    wood: {
        gradient: "from-amber-900 via-yellow-900 to-black",
        texture: "bg-[url('https://grainy-gradients.vercel.app/noise.svg')]",
        border: "border-amber-700",
        label: "ECO WALNUT"
    }
}

export default function CardPreview3D({ material, name, title, logoUrl }: CardPreview3DProps) {
    const style = materialStyles[material]

    return (
        <div className="relative perspective-1000">
            {/* Glow Behind */}
            <div className={`absolute -inset-10 bg-gradient-to-br ${style.gradient} blur-[80px] opacity-40 rounded-full`} />

            {/* Card */}
            <motion.div
                initial={{ rotateY: 0, rotateX: 0 }}
                whileHover={{ rotateY: 10, rotateX: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`relative w-[320px] h-[200px] md:w-[400px] md:h-[250px] rounded-2xl border ${style.border} shadow-2xl overflow-hidden preserve-3d cursor-pointer`}
            >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />

                {/* Texture */}
                <div className={`absolute inset-0 ${style.texture} opacity-30 mix-blend-overlay`} />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top Row */}
                    <div className="flex justify-between items-start">
                        {/* Logo/Avatar */}
                        <div className="h-14 w-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                            {logoUrl ? (
                                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-white/30 text-xs text-center">LOGO</div>
                            )}
                        </div>

                        {/* NFC Icon */}
                        <div className="text-white/20">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
                            </svg>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">
                            {name || "YOUR NAME"}
                        </h3>
                        <p className="text-sm text-white/60 tracking-widest uppercase mt-1">
                            {title || "Your Title"}
                        </p>
                    </div>
                </div>

                {/* Material Label */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] text-white/40 tracking-widest">
                    {style.label}
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
