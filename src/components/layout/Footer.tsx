"use client"

import { motion } from "framer-motion"
import { Facebook, Github, Instagram, Linkedin, Twitter, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function Footer() {
    const footerLinks = {
        Product: [
            { name: "Features", href: "#" },
            { name: "Pricing", href: "#" },
            { name: "Enterprise", href: "#" },
            { name: "Case Studies", href: "#" },
            { name: "Reviews", href: "#" },
        ],
        Company: [
            { name: "About", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Press", href: "#" },
            { name: "Contact", href: "#" },
        ],
        Resources: [
            { name: "Community", href: "#" },
            { name: "Help Center", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Status", href: "#" },
        ],
    }

    return (
        <footer className="relative bg-[#050505] text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
            {/* Background Mesh */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-900/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block">
                            <h2 className="text-3xl font-bold tracking-tighter">
                                Tap<span className="text-violet-400">Once</span>
                            </h2>
                        </Link>
                        <p className="max-w-md text-zinc-400 text-lg">
                            The last business card you'll ever need. Secure, sustainable, and smarter than ever efficiently.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin, Instagram, Facebook].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-violet-500/50 hover:text-violet-400 transition-all"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CTA Column */}
                    <div className="flex flex-col justify-end items-start lg:items-end">
                        <h3 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                            Ready to make<br />an <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">impact?</span>
                        </h3>
                        <Link
                            href="/register"
                            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-xl font-bold hover:bg-zinc-200 transition-colors"
                        >
                            Get Started
                            <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/10 pt-16">
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-lg font-semibold mb-6">{category}</h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
                        <p className="text-zinc-400 mb-4 text-sm">
                            Subscribe to our newsletter for the latest updates and features.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-16 pt-8 border-t border-white/5 text-sm text-zinc-500">
                    <p>&copy; {new Date().getFullYear()} TapOnce Technologies Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-zinc-300">Privacy</Link>
                        <Link href="#" className="hover:text-zinc-300">Terms</Link>
                        <Link href="#" className="hover:text-zinc-300">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
