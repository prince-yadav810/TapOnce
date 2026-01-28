"use client"

import MaterialSelector from "@/components/order/MaterialSelector"
import OrderSummary from "@/components/order/OrderSummary"
import PersonalizationForm from "@/components/order/PersonalizationForm"
import TemplateCardPreview from "@/components/order/TemplateCardPreview"
import TemplateSelector from "@/components/order/TemplateSelector"
import Navbar from "@/components/layout/Navbar"
import { CardTemplate } from "@/data/cardTemplates"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"

export default function OrderPage() {
    const [material, setMaterial] = useState<"metal" | "pvc" | "wood">("metal")
    const [template, setTemplate] = useState<CardTemplate | null>(null)
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [logoUrl, setLogoUrl] = useState("")

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                        Design Your <span className="text-violet-400">Card</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Choose from 30+ profession-specific templates. Preview in real-time. Order in minutes.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Live Preview */}
                    <div className="lg:sticky lg:top-24">
                        <div className="flex items-center justify-center min-h-[400px]">
                            <TemplateCardPreview
                                template={template}
                                material={material}
                                name={name}
                                title={title}
                                logoUrl={logoUrl}
                            />
                        </div>

                        <p className="text-center text-zinc-500 text-sm mt-8">
                            ↔ Hover to rotate • Updates in real-time
                        </p>
                    </div>

                    {/* Right: Customization Form */}
                    <div className="space-y-10">
                        {/* Step 1: Template Selection */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center font-bold text-sm">1</div>
                                <span className="text-zinc-400">Choose Template</span>
                            </div>
                            <TemplateSelector selected={template} onSelect={setTemplate} />
                        </div>

                        <hr className="border-white/5" />

                        {/* Step 2: Material */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center font-bold text-sm">2</div>
                                <span className="text-zinc-400">Choose Material</span>
                            </div>
                            <MaterialSelector selected={material} onSelect={setMaterial} />
                        </div>

                        <hr className="border-white/5" />

                        {/* Step 3: Personalization */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center font-bold text-sm">3</div>
                                <span className="text-zinc-400">Personalize</span>
                            </div>
                            <PersonalizationForm
                                name={name}
                                title={title}
                                logoUrl={logoUrl}
                                onNameChange={setName}
                                onTitleChange={setTitle}
                                onLogoChange={setLogoUrl}
                            />
                        </div>

                        <hr className="border-white/5" />

                        {/* Step 4: Checkout */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-violet-500 flex items-center justify-center font-bold text-sm">4</div>
                                <span className="text-zinc-400">Checkout</span>
                            </div>
                            <OrderSummary
                                material={material}
                                name={name}
                                title={title}
                                niche={template?.professionId || "corporate"}
                                templateId={template?.id}
                                templateName={template?.name}
                                logoUrl={logoUrl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
