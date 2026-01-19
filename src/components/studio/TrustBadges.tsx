"use client"

import { Shield, Truck, RefreshCw, Clock, Package } from "lucide-react"
import React from "react"

interface TrustBadgesProps {
    material: "metal" | "pvc" | "wood"
}

// Calculate delivery date (5-7 days from now)
const getDeliveryDate = () => {
    const now = new Date()
    const minDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)
    const maxDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
    return `${minDate.toLocaleDateString('en-IN', options)} - ${maxDate.toLocaleDateString('en-IN', options)}`
}

// Simulated stock (this would come from backend)
const getStockCount = (material: string) => {
    const stocks: Record<string, number> = {
        metal: 12,
        pvc: 48,
        wood: 8
    }
    return stocks[material] || 20
}

export default function TrustBadges({ material }: TrustBadgesProps) {
    const stock = getStockCount(material)
    const isLowStock = stock < 15

    return (
        <div className="space-y-4">
            {/* Delivery Estimate */}
            <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <Truck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div>
                    <p className="text-sm text-white font-medium">Free Delivery: {getDeliveryDate()}</p>
                    <p className="text-xs text-emerald-400">Order within 2 hours for fastest shipping</p>
                </div>
            </div>

            {/* Stock Indicator */}
            {isLowStock && (
                <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <Package className="h-5 w-5 text-amber-400 flex-shrink-0" />
                    <div>
                        <p className="text-sm text-white font-medium">Only {stock} left in stock</p>
                        <p className="text-xs text-amber-400">High demand for this material</p>
                    </div>
                </div>
            )}

            {/* Trust Badges Grid */}
            <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                    <Shield className="h-5 w-5 text-zinc-400" />
                    <span className="text-[10px] md:text-xs text-zinc-500">Secure<br />Checkout</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                    <RefreshCw className="h-5 w-5 text-zinc-400" />
                    <span className="text-[10px] md:text-xs text-zinc-500">30-Day<br />Returns</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-white/5 rounded-xl text-center">
                    <Clock className="h-5 w-5 text-zinc-400" />
                    <span className="text-[10px] md:text-xs text-zinc-500">Lifetime<br />Warranty</span>
                </div>
            </div>
        </div>
    )
}
