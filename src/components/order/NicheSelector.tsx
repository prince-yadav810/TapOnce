"use client"

import { motion } from "framer-motion"
import { Building2, User, Vote, Palette, Check } from "lucide-react"
import React from "react"

interface NicheSelectorProps {
    selected: string
    onSelect: (niche: string) => void
}

const niches = [
    {
        id: "corporate",
        name: "Corporate",
        icon: Building2,
        description: "For business professionals, executives, and companies",
        color: "violet"
    },
    {
        id: "personal",
        name: "Personal",
        icon: User,
        description: "For individuals, freelancers, and personal branding",
        color: "cyan"
    },
    {
        id: "political",
        name: "Political",
        icon: Vote,
        description: "For politicians, leaders, and public figures",
        color: "amber"
    },
    {
        id: "creative",
        name: "Creative",
        icon: Palette,
        description: "For artists, designers, and content creators",
        color: "pink"
    }
]

export default function NicheSelector({ selected, onSelect }: NicheSelectorProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Select Your Category</h3>
            <p className="text-sm text-zinc-400">This determines your default digital profile template</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {niches.map((niche) => (
                    <motion.button
                        key={niche.id}
                        onClick={() => onSelect(niche.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-4 rounded-xl border text-center transition-all ${selected === niche.id
                                ? `bg-${niche.color}-500/10 border-${niche.color}-500`
                                : "bg-zinc-900/50 border-white/10 hover:border-white/20"
                            }`}
                    >
                        {selected === niche.id && (
                            <div className={`absolute top-2 right-2 h-5 w-5 bg-${niche.color}-500 rounded-full flex items-center justify-center`}>
                                <Check className="h-3 w-3 text-white" />
                            </div>
                        )}

                        <div className={`h-12 w-12 mx-auto rounded-xl bg-${niche.color}-500/20 flex items-center justify-center mb-3`}>
                            <niche.icon className={`h-6 w-6 text-${niche.color}-400`} />
                        </div>

                        <h4 className="font-bold text-white mb-1">{niche.name}</h4>
                        <p className="text-xs text-zinc-500 line-clamp-2">{niche.description}</p>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}
