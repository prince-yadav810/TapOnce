"use client"

import { motion } from "framer-motion"
import { ArrowRight, ShoppingCart } from "lucide-react"
import React from "react"

interface StickyBottomBarProps {
    price: number
    isValid: boolean
    onCheckout: () => void
}

export default function StickyBottomBar({ price, isValid, onCheckout }: StickyBottomBarProps) {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-3 md:py-4 safe-area-bottom"
        >
            <div className="container mx-auto flex items-center justify-between gap-4 max-w-2xl">
                {/* Price */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500">Total</p>
                        <p className="text-xl font-black text-white">₹{price}</p>
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={onCheckout}
                    disabled={!isValid}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all ${isValid
                            ? "bg-white text-black hover:scale-105 active:scale-95"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        }`}
                >
                    <span className="hidden sm:inline">Continue to Checkout</span>
                    <span className="sm:hidden">Checkout</span>
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </motion.div>
    )
}
