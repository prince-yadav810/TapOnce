"use client"

import { motion } from "framer-motion"
import { Play, Smartphone, Zap } from "lucide-react"
import React, { useState } from "react"

export default function VideoDemo() {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#050505]">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-tight">
                            See the <span className="text-violet-400">Magic</span><br />
                            in Action
                        </h2>

                        <p className="text-xl text-zinc-400 leading-relaxed">
                            One tap. That's all it takes. Watch how TapOnce transforms a simple interaction into a memorable connection.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                                    <Smartphone className="h-6 w-6 text-violet-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">No App Needed</h4>
                                    <p className="text-zinc-400">Works instantly on any NFC-enabled smartphone. iPhone or Android.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                    <Zap className="h-6 w-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">Under 1 Second</h4>
                                    <p className="text-zinc-400">Instant profile loading. No QR scanning, no typing URLs.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-video rounded-3xl bg-[#111] border border-white/10 overflow-hidden group cursor-pointer"
                        onClick={() => setIsPlaying(!isPlaying)}
                    >
                        {/* Video Thumbnail/Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/20 to-blue-900/10">
                            {!isPlaying ? (
                                <>
                                    {/* Phone Mockup */}
                                    <div className="relative">
                                        <div className="w-32 h-64 bg-black rounded-3xl border-4 border-zinc-800 shadow-2xl flex items-center justify-center">
                                            <div className="text-center text-zinc-600">
                                                <Smartphone className="h-12 w-12 mx-auto mb-2" />
                                                <span className="text-xs">Tap Here</span>
                                            </div>
                                        </div>

                                        {/* Card hovering near phone */}
                                        <motion.div
                                            animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute -right-16 top-1/2 -translate-y-1/2 w-24 h-16 bg-gradient-to-br from-zinc-900 to-black rounded-lg border border-white/10 shadow-lg"
                                        />
                                    </div>

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                                        <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                            <Play className="h-8 w-8 text-black ml-1" fill="black" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    <p className="text-zinc-400">Video Player Placeholder</p>
                                </div>
                            )}
                        </div>

                        {/* Corner Glow */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
