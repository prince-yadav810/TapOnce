"use client"

import { motion } from "framer-motion"
import React from "react"

const brands = [
    "Google", "Microsoft", "Spotify", "Amazon", "Netflix", "Adobe", "Shopify", "Tesla", "Airbnb", "Uber"
]

export default function TrustedBy() {
    return (
        <section className="py-12 bg-[#0A0A0A] overflow-hidden border-b border-white/5">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                    Trusted by forward-thinking teams at
                </p>
            </div>

            <div className="flex relative items-center">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

                {/* Marquee Container */}
                <div className="flex w-full overflow-hidden">
                    <motion.div
                        className="flex gap-16 items-center whitespace-nowrap px-8"
                        animate={{ x: "-50%" }}
                        transition={{
                            ease: "linear",
                            duration: 30, // Adjust speed
                            repeat: Infinity,
                        }}
                    >
                        {/* Duplicate list for seamless loop */}
                        {[...brands, ...brands, ...brands].map((brand, i) => (
                            <div key={i} className="text-2xl font-bold text-zinc-700 hover:text-white transition-colors cursor-default select-none">
                                {brand}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
