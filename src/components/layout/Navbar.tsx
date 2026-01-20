"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { scrollY } = useScroll()

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50)
        })
        return () => unsubscribe()
    }, [scrollY])

    const navLinks = [
        { name: "Shop", href: "#collection" },
        { name: "Enterprise", href: "#business" },
        { name: "About", href: "#features" },
    ]

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
        >
            <div
                className={cn(
                    "relative flex items-center justify-between px-6 py-3 transition-all duration-500 ease-in-out",
                    isScrolled
                        ? "w-[90%] md:w-[70%] lg:w-[50%] bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_20px_-10px_rgba(255,255,255,0.1)]"
                        : "w-full max-w-7xl bg-transparent"
                )}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                        <span className="font-bold text-white text-lg">T</span>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className={cn("font-bold text-lg tracking-tight transition-opacity", isScrolled ? "text-white" : "text-white")}>
                        Tap<span className="text-violet-400">Once</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
                        >
                            {link.name}
                            <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-white hover:text-violet-300 transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className={cn(
                            "px-5 py-2 text-sm font-medium rounded-full transition-all hover:scale-105 active:scale-95",
                            isScrolled
                                ? "bg-white text-black hover:bg-zinc-200"
                                : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
                        )}
                    >
                        Get Card
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-white"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute top-full left-0 right-0 mt-4 p-4 mx-4 rounded-2xl bg-[#0A0A0A] border border-white/10 shadow-2xl md:hidden flex flex-col gap-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-white/10 my-2" />
                        <Link
                            href="/login"
                            className="block px-4 py-3 text-sm font-medium text-center text-zinc-400 hover:text-white"
                        >
                            Login
                        </Link>
                        <Link
                            href="/register"
                            className="block px-4 py-3 text-sm font-medium text-center bg-white text-black rounded-xl hover:bg-zinc-200"
                        >
                            Get Custom Card
                        </Link>
                    </motion.div>
                )}
            </div>
        </motion.header>
    )
}
