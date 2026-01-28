"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function StickyMobileCTA() {
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

    return (
        <motion.div
            style={{ opacity }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black via-black/95 to-transparent md:hidden"
        >
            <Link
                href="/order"
                className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black font-bold rounded-full text-lg shadow-lg shadow-white/10"
            >
                Get Your Card
                <ArrowRight className="h-5 w-5" />
            </Link>
        </motion.div>
    )
}
