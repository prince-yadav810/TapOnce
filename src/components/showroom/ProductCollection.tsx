"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import React, { useState } from "react"

const products = [
    {
        id: "metal",
        name: "Matte Black Metal",
        price: "$49.99",
        description: "The ultimate statement. Laser-engraved stainless steel with a premium matte finish. Heavy, durable, and unforgettable.",
        features: ["Stainless Steel Core", "Laser Engraving", "Matte Anti-Fingerprint", "Lifetime Warranty"],
        color: "bg-zinc-900 border-zinc-700",
        texture: "linear-gradient(45deg, #111 0%, #222 100%)"
    },
    {
        id: "wood",
        name: "Eco Walnut",
        price: "$39.99",
        description: "Review nature with technology. Real walnut wood finish containing an embedded NFC chip. Sustainable luxury.",
        features: ["Real Walnut Wood", "FSC Certified", "Unique Grain Pattern", " biodegradable"],
        color: "bg-amber-900 border-amber-800",
        texture: "url('https://grainy-gradients.vercel.app/noise.svg')" // Placeholder for wood texture
    },
    {
        id: "custom",
        name: "Custom PVC",
        price: "$29.99",
        description: "Your brand, front and center. Full color printing edge-to-edge. Perfect for teams and corporate identity.",
        features: ["Full Color Print", "Durable PVC", "Gloss or Matte", "Bulk Discounts"],
        color: "bg-blue-600 border-blue-500",
        texture: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)"
    }
]

export default function ProductCollection() {
    const [selected, setSelected] = useState(products[0])

    return (
        <section id="collection" className="py-24 bg-[#050505] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">The Collection</h2>
                    <p className="text-zinc-400 max-w-lg mx-auto">Choose the material that speaks your language.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Visualizer */}
                    <div className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`relative w-[300px] h-[188px] md:w-[400px] md:h-[250px] rounded-xl shadow-2xl ${selected.color}`}
                            style={{ background: selected.texture }}
                        >
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                <div className="h-8 w-8 rounded bg-white/20" />
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-white/20 rounded" />
                                    <div className="h-3 w-20 bg-white/10 rounded" />
                                </div>
                            </div>

                            {/* Material Sheen */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-xl pointer-events-none" />
                        </motion.div>
                    </div>

                    {/* Selector */}
                    <div className="space-y-8">
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {products.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setSelected(p)}
                                    className={`relative px-6 py-4 rounded-xl border transition-all text-left min-w-[160px] ${selected.id === p.id
                                            ? "bg-white/10 border-violet-500"
                                            : "bg-zinc-900/50 border-white/5 hover:bg-zinc-900"
                                        }`}
                                >
                                    <div className="font-bold text-lg mb-1">{p.name}</div>
                                    <div className="text-sm text-zinc-400">{p.price}</div>
                                    {selected.id === p.id && (
                                        <motion.div layoutId="active-ring" className="absolute inset-0 border-2 border-violet-500 rounded-xl" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold">{selected.name}</h3>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                {selected.description}
                            </p>

                            <ul className="grid grid-cols-2 gap-4">
                                {selected.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-zinc-300">
                                        <div className="h-5 w-5 rounded-full bg-violet-600/20 flex items-center justify-center text-violet-400">
                                            <Check size={12} />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors mt-4">
                                Buy {selected.name}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
