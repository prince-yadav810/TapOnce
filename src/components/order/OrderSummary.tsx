"use client"

import { ArrowRight, Shield, Truck, CreditCard } from "lucide-react"
import React, { useState } from "react"

interface OrderSummaryProps {
    material: "metal" | "pvc" | "wood"
    name: string
    title: string
    niche: string
}

const materialPrices = {
    metal: 1499,
    pvc: 699,
    wood: 999
}

const materialNames = {
    metal: "Matte Black Metal",
    pvc: "Premium PVC",
    wood: "Eco Walnut"
}

export default function OrderSummary({ material, name, title, niche }: OrderSummaryProps) {
    const [loading, setLoading] = useState(false)
    const [shipping, setShipping] = useState({
        flat: "",
        building: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        email: ""
    })

    const price = materialPrices[material]
    const shippingCost = 0 // Free shipping
    const total = price + shippingCost

    const handleInputChange = (field: string, value: string) => {
        setShipping((prev) => ({ ...prev, [field]: value }))
    }

    const handleCheckout = async () => {
        setLoading(true)
        // TODO: Integrate Razorpay
        // For now, simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 2000))
        alert("Razorpay integration coming soon! Order data logged.")
        console.log({
            material,
            name,
            title,
            niche,
            shipping,
            total
        })
        setLoading(false)
    }

    const isFormValid = name && shipping.phone && shipping.email && shipping.city && shipping.pincode

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Order Summary</h3>

            {/* Summary */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 space-y-4">
                <div className="flex justify-between">
                    <span className="text-zinc-400">Card Type</span>
                    <span className="text-white font-medium">{materialNames[material]}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-zinc-400">Name</span>
                    <span className="text-white font-medium">{name || "—"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-zinc-400">Title</span>
                    <span className="text-white font-medium">{title || "—"}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-zinc-400">Category</span>
                    <span className="text-white font-medium capitalize">{niche}</span>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between">
                    <span className="text-zinc-400">Card Price</span>
                    <span className="text-white font-medium">₹{price}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="text-emerald-400 font-medium">FREE</span>
                </div>
                <hr className="border-white/10" />
                <div className="flex justify-between text-lg">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-violet-400 font-bold">₹{total}</span>
                </div>
            </div>

            {/* Shipping Form */}
            <div className="space-y-4">
                <h4 className="font-bold text-white">Shipping Details</h4>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Phone *"
                        value={shipping.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="col-span-2 md:col-span-1 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                    />
                    <input
                        type="email"
                        placeholder="Email *"
                        value={shipping.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="col-span-2 md:col-span-1 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                    />
                    <input
                        type="text"
                        placeholder="Flat / Apartment"
                        value={shipping.flat}
                        onChange={(e) => handleInputChange("flat", e.target.value)}
                        className="col-span-2 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                    />
                    <input
                        type="text"
                        placeholder="Street / Locality"
                        value={shipping.street}
                        onChange={(e) => handleInputChange("street", e.target.value)}
                        className="col-span-2 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                    />
                    <input
                        type="text"
                        placeholder="City *"
                        value={shipping.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                    />
                    <input
                        type="text"
                        placeholder="Pincode *"
                        value={shipping.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        className="px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                    />
                </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-400" />
                    Secure Checkout
                </div>
                <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-emerald-400" />
                    Free Shipping
                </div>
                <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-emerald-400" />
                    UPI, Cards, Netbanking
                </div>
            </div>

            {/* Checkout Button */}
            <button
                onClick={handleCheckout}
                disabled={!isFormValid || loading}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-lg transition-all ${isFormValid && !loading
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    }`}
            >
                {loading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        Pay ₹{total} <ArrowRight className="h-5 w-5" />
                    </>
                )}
            </button>
        </div>
    )
}
