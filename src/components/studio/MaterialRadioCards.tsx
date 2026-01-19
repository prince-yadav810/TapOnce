"use client"

import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import React from "react"

interface MaterialRadioCardsProps {
    selected: "metal" | "pvc" | "wood"
    onSelect: (material: "metal" | "pvc" | "wood") => void
}

const materials = [
    {
        id: "pvc" as const,
        name: "PVC",
        price: 699,
        badge: "BEST VALUE",
        description: "Lightweight & versatile",
        texture: "from-slate-800 to-slate-900",
        features: ["Full color print", "Glossy finish"]
    },
    {
        id: "metal" as const,
        name: "Metal",
        price: 1499,
        badge: "MOST POPULAR",
        description: "Premium & durable",
        texture: "from-zinc-700 to-zinc-900",
        features: ["Laser engraved", "Lifetime warranty"]
    },
    {
        id: "wood" as const,
        name: "Wood",
        price: 999,
        badge: "ECO-FRIENDLY",
        description: "Unique & sustainable",
        texture: "from-amber-800 to-yellow-900",
        features: ["Real walnut", "Unique grain"]
    }
]

export default function MaterialRadioCards({ selected, onSelect }: MaterialRadioCardsProps) {
    return (
        <div className="grid grid-cols-3 gap-3">
            {materials.map((material) => (
                <motion.button
                    key={material.id}
                    onClick={() => onSelect(material.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative p-3 md:p-4 rounded-xl border-2 text-left transition-all ${selected === material.id
                            ? "border-white bg-white/5"
                            : "border-white/10 hover:border-white/20"
                        }`}
                >
                    {/* Badge */}
                    {material.id === "metal" && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-violet-500 text-white text-[8px] md:text-[9px] font-bold rounded-full flex items-center gap-1 whitespace-nowrap">
                            <Sparkles className="h-2 w-2 md:h-3 md:w-3" />
                            <span className="hidden sm:inline">{material.badge}</span>
                            <span className="sm:hidden">POPULAR</span>
                        </div>
                    )}

                    {/* Material Preview */}
                    <div className={`w-full aspect-[1.6/1] rounded-lg bg-gradient-to-br ${material.texture} mb-3 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                        {/* Check */}
                        {selected === material.id && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-1 right-1 h-5 w-5 bg-white rounded-full flex items-center justify-center"
                            >
                                <Check className="h-3 w-3 text-black" />
                            </motion.div>
                        )}
                    </div>

                    {/* Info */}
                    <h4 className="font-bold text-white text-sm md:text-base">{material.name}</h4>
                    <p className="text-lg md:text-xl font-black text-white">₹{material.price}</p>
                    <p className="text-[10px] md:text-xs text-zinc-500 mt-1 hidden sm:block">{material.description}</p>
                </motion.button>
            ))}
        </div>
    )
}
