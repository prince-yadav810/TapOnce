"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    Scale, Stethoscope, Building2, Palette, Home, Camera,
    Check, ChevronDown
} from "lucide-react"
import React, { useState } from "react"
import { CardTemplate, allTemplates, professions, getTemplatesByProfession } from "@/data/cardTemplates"

interface TemplateSelectorProps {
    selected: CardTemplate | null
    onSelect: (template: CardTemplate) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Scale, Stethoscope, Building2, Palette, Home, Camera
}

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
    const [activeProfession, setActiveProfession] = useState<string>("legal")
    const [isExpanded, setIsExpanded] = useState(true)

    const templates = getTemplatesByProfession(activeProfession)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Choose Your Template</h3>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-zinc-400 hover:text-white transition-colors"
                >
                    <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-6 overflow-hidden"
                    >
                        {/* Profession Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {professions.map((prof) => {
                                const Icon = iconMap[prof.icon] || Building2
                                return (
                                    <button
                                        key={prof.id}
                                        onClick={() => setActiveProfession(prof.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeProfession === prof.id
                                                ? "bg-violet-500 text-white"
                                                : "bg-zinc-900/50 text-zinc-400 border border-white/10 hover:border-white/20"
                                            }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {prof.name}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Template Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {templates.map((template) => (
                                <motion.button
                                    key={template.id}
                                    onClick={() => onSelect(template)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`relative rounded-xl border overflow-hidden text-left transition-all ${selected?.id === template.id
                                            ? "ring-2 ring-violet-500 border-violet-500"
                                            : "border-white/10 hover:border-white/20"
                                        }`}
                                >
                                    {/* Card Preview */}
                                    <div className={`aspect-[1.6/1] bg-gradient-to-br ${template.gradient} p-4 relative`}>
                                        {/* Noise Texture */}
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                                        {/* Icon */}
                                        <div className="absolute top-3 right-3 h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                                            <div className="h-4 w-4 rounded-full bg-white/30" />
                                        </div>

                                        {/* Text Preview */}
                                        <div className="absolute bottom-3 left-4">
                                            <div className={`h-2 w-16 bg-white/30 rounded mb-1 ${template.fontFamily}`} />
                                            <div className="h-1.5 w-12 bg-white/20 rounded" />
                                        </div>

                                        {/* Selected Check */}
                                        {selected?.id === template.id && (
                                            <div className="absolute top-3 left-3 h-6 w-6 bg-violet-500 rounded-full flex items-center justify-center">
                                                <Check className="h-4 w-4 text-white" />
                                            </div>
                                        )}

                                        {/* Popular Badge */}
                                        {template.popular && (
                                            <div className="absolute top-3 left-3 px-2 py-0.5 bg-amber-500 text-black text-[9px] font-bold rounded uppercase">
                                                Popular
                                            </div>
                                        )}
                                    </div>

                                    {/* Template Info */}
                                    <div className="p-3 bg-zinc-900/80">
                                        <h4 className="font-bold text-white text-sm">{template.name}</h4>
                                        <p className="text-xs text-zinc-500 truncate">{template.description}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Selected Template Summary */}
            {selected && (
                <div className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-white/10 rounded-xl">
                    <div className={`h-12 w-20 rounded-lg bg-gradient-to-br ${selected.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    </div>
                    <div>
                        <p className="font-bold text-white">{selected.name}</p>
                        <p className="text-xs text-zinc-500">{selected.profession} • {selected.fontStyle} style</p>
                    </div>
                </div>
            )}
        </div>
    )
}
