"use client"

import { motion } from "framer-motion"
import {
    Scale, Stethoscope, Building2, Palette, Home, Camera, Check
} from "lucide-react"
import React, { useRef } from "react"
import { CardTemplate, getTemplatesByProfession, getPopularTemplates, professions } from "@/data/cardTemplates"

interface StylePickerProps {
    selectedTemplate: CardTemplate | null
    onSelectTemplate: (template: CardTemplate) => void
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Scale, Stethoscope, Building2, Palette, Home, Camera
}

export default function StylePicker({ selectedTemplate, onSelectTemplate }: StylePickerProps) {
    const [activeCategory, setActiveCategory] = React.useState<string | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    const templates = activeCategory
        ? getTemplatesByProfession(activeCategory)
        : getPopularTemplates()

    return (
        <div className="space-y-5">
            {/* Category Chips */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === null
                            ? "bg-white text-black"
                            : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
                        }`}
                >
                    ✨ Popular
                </button>
                {professions.map((prof) => {
                    const Icon = iconMap[prof.icon] || Building2
                    return (
                        <button
                            key={prof.id}
                            onClick={() => setActiveCategory(prof.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === prof.id
                                    ? "bg-white text-black"
                                    : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
                                }`}
                        >
                            <Icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{prof.name}</span>
                            <span className="sm:hidden">{prof.name.split(' ')[0]}</span>
                        </button>
                    )
                })}
            </div>

            {/* Template Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            >
                {templates.map((template) => (
                    <motion.button
                        key={template.id}
                        onClick={() => onSelectTemplate(template)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative flex-shrink-0 snap-start w-[140px] md:w-[160px] rounded-xl overflow-hidden border-2 transition-all ${selectedTemplate?.id === template.id
                                ? "border-white ring-2 ring-white/30"
                                : "border-transparent hover:border-white/20"
                            }`}
                    >
                        {/* Card Preview */}
                        <div className={`aspect-[1.6/1] bg-gradient-to-br ${template.gradient} p-3 relative`}>
                            {/* Noise */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                            {/* Mini Icon */}
                            <div className="absolute top-2 right-2 h-6 w-6 rounded bg-white/10 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-white/30" />
                            </div>

                            {/* Text Lines */}
                            <div className="absolute bottom-2 left-3">
                                <div className="h-1.5 w-10 bg-white/40 rounded mb-1" />
                                <div className="h-1 w-8 bg-white/20 rounded" />
                            </div>

                            {/* Selected Check */}
                            {selectedTemplate?.id === template.id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-2 left-2 h-5 w-5 bg-white rounded-full flex items-center justify-center"
                                >
                                    <Check className="h-3 w-3 text-black" />
                                </motion.div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-2 bg-zinc-900/80">
                            <p className="text-xs font-medium text-white truncate">{template.name}</p>
                            <p className="text-[10px] text-zinc-500">{template.fontStyle}</p>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Category Label */}
            <p className="text-xs text-zinc-500 text-center">
                {activeCategory
                    ? `${templates.length} templates for ${professions.find(p => p.id === activeCategory)?.name}`
                    : `${templates.length} most popular templates`
                }
            </p>
        </div>
    )
}
