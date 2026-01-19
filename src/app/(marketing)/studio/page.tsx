"use client"

import CardPreview3DEnhanced from "@/components/studio/CardPreview3DEnhanced"
import MaterialRadioCards from "@/components/studio/MaterialRadioCards"
import PersonalizationPanel from "@/components/studio/PersonalizationPanel"
import StickyBottomBar from "@/components/studio/StickyBottomBar"
import StylePicker from "@/components/studio/StylePicker"
import TrustBadges from "@/components/studio/TrustBadges"
import Navbar from "@/components/layout/Navbar"
import { CardTemplate } from "@/data/cardTemplates"
import { ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const materialPrices = {
    metal: 1499,
    pvc: 699,
    wood: 999
}

export default function StudioPage() {
    const router = useRouter()
    const [template, setTemplate] = useState<CardTemplate | null>(null)
    const [material, setMaterial] = useState<"metal" | "pvc" | "wood">("metal")
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [logoUrl, setLogoUrl] = useState("")

    const price = materialPrices[material]
    const isValid = template !== null && name.length >= 2

    const handleCheckout = () => {
        // Store order data and navigate to checkout
        const orderData = {
            template: template?.id,
            material,
            name,
            title,
            logoUrl,
            price
        }
        sessionStorage.setItem('orderData', JSON.stringify(orderData))
        router.push('/checkout')
    }

    return (
        <main className="min-h-screen bg-[#030303] text-white pb-24">
            <Navbar />

            <div className="container mx-auto px-4 pt-8 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Back</span>
                    </Link>

                    <div className="flex items-center gap-2 text-violet-400">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium">The Card Studio</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* Left: Preview */}
                    <div className="lg:sticky lg:top-8 flex flex-col items-center">
                        <CardPreview3DEnhanced
                            template={template}
                            material={material}
                            name={name}
                            title={title}
                            logoUrl={logoUrl}
                        />
                    </div>

                    {/* Right: Controls */}
                    <div className="space-y-8">
                        {/* Step 1: Style */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-7 w-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-sm font-bold">
                                    1
                                </div>
                                <h2 className="text-lg font-bold text-white">Pick Your Style</h2>
                            </div>
                            <StylePicker
                                selectedTemplate={template}
                                onSelectTemplate={setTemplate}
                            />
                        </section>

                        <hr className="border-white/5" />

                        {/* Step 2: Personalize */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-7 w-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-sm font-bold">
                                    2
                                </div>
                                <h2 className="text-lg font-bold text-white">Personalize</h2>
                            </div>
                            <PersonalizationPanel
                                name={name}
                                title={title}
                                logoUrl={logoUrl}
                                onNameChange={setName}
                                onTitleChange={setTitle}
                                onLogoChange={setLogoUrl}
                            />
                        </section>

                        <hr className="border-white/5" />

                        {/* Step 3: Material */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-7 w-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-sm font-bold">
                                    3
                                </div>
                                <h2 className="text-lg font-bold text-white">Choose Material</h2>
                            </div>
                            <MaterialRadioCards
                                selected={material}
                                onSelect={setMaterial}
                            />
                        </section>

                        <hr className="border-white/5" />

                        {/* Trust & Delivery */}
                        <TrustBadges material={material} />
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <StickyBottomBar
                price={price}
                isValid={isValid}
                onCheckout={handleCheckout}
            />
        </main>
    )
}
