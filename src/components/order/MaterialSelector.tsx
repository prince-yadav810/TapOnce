"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import React from "react"

interface MaterialSelectorProps {
    selected: "metal" | "pvc" | "wood"
    onSelect: (material: "metal" | "pvc" | "wood") => void
}

const materials = [
    {
        id: "metal" as const,
        name: "Matte Black Metal",
        price: "₹1,499",
        description: "Premium stainless steel with laser engraving. Heavy, durable, unforgettable.",
        features: ["Stainless Steel", "Laser Engraved", "Lifetime Warranty"],
        gradient: "from-zinc-800 to-black",
        popular: true
    },
    {
        id: "pvc" as const,
        name: "Premium PVC",
        price: "₹699",
        description: "Full color printing edge-to-edge. Lightweight, cost-effective, professional.",
        features: ["Full Color Print", "Glossy or Matte", "Bulk Discounts"],
        gradient: "from-blue-900 to-indigo-900",
        popular: false
    },
    {
        id: "wood" as const,
        name: "Eco Walnut",
        price: "₹999",
        description: "Real walnut wood with embedded NFC. Sustainable, unique grain, statement piece.",
        features: ["Real Wood", "FSC Certified", "Unique Grain"],
        gradient: "from-amber-800 to-yellow-900",
        popular: false
    }
]

export default function MaterialSelector({ selected, onSelect }: MaterialSelectorProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Choose Your Material</h3>

            <div className="grid md:grid-cols-3 gap-4">
                {materials.map((material) => (
                    <motion.button
                        key={material.id}
                        onClick={() => onSelect(material.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-6 rounded-2xl border text-left transition-all ${selected === material.id
                                ? "bg-white/10 border-violet-500 ring-2 ring-violet-500/50"
                                : "bg-zinc-900/50 border-white/10 hover:border-white/20"
                            }`}
                    >
                        {/* Popular Badge */}
                        {material.popular && (
                            <div className="absolute -top-3 left-4 px-3 py-1 bg-violet-500 text-white text-xs font-bold rounded-full">
                                MOST POPULAR
                            </div>
                        )}

                        {/* Selected Check */}
                        {selected === material.id && (
                            <div className="absolute top-4 right-4 h-6 w-6 bg-violet-500 rounded-full flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                            </div>
                        )}

                        {/* Material Preview */}
                        <div className={`h-16 w-full rounded-lg bg-gradient-to-br ${material.gradient} mb-4 relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
                        </div>

                        <h4 className="text-lg font-bold text-white mb-1">{material.name}</h4>
                        <p className="text-2xl font-black text-violet-400 mb-3">{material.price}</p>
                        <p className="text-sm text-zinc-400 mb-4">{material.description}</p>

                        <ul className="space-y-1">
                            {material.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-xs text-zinc-500">
                                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}
