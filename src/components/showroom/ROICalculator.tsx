"use client"

import { motion } from "framer-motion"
import { Calculator, Sprout } from "lucide-react"
import React, { useState } from "react"

export default function ROICalculator() {
    const [employees, setEmployees] = useState(50)

    // Assumptions:
    // Paper card cost: $0.50 per card
    // Cards per year per employee (reprints/updates): 100
    // Digital card cost: $30 (one time) + Free updates

    const paperCost = employees * 100 * 0.50
    const digitalCost = employees * 30
    const savings = paperCost - (digitalCost / 3) // Amortized over 3 years roughly
    const treesSaved = Math.floor(employees * 0.05) // Rough estimate

    return (
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="rounded-3xl bg-[#111] border border-white/10 p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-white">Stop Wasting Money on Paper</h2>
                        <p className="text-zinc-400">See how much your company could save by switching to TapOnce.</p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-4">
                                Company Size: <span className="text-white font-bold">{employees} Employees</span>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="1000"
                                step="10"
                                value={employees}
                                onChange={(e) => setEmployees(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <Calculator size={20} />
                                    </div>
                                </div>
                                <div className="text-sm text-emerald-400 font-medium mb-1">Estimated Annual Savings</div>
                                <div className="text-4xl font-bold text-white">${Math.floor(savings).toLocaleString()}</div>
                                <div className="text-xs text-zinc-500 mt-2">vs traditional paper card printing</div>
                            </div>

                            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <Sprout size={20} />
                                    </div>
                                </div>
                                <div className="text-sm text-green-400 font-medium mb-1">Environmental Impact</div>
                                <div className="text-4xl font-bold text-white">{treesSaved} Trees</div>
                                <div className="text-xs text-zinc-500 mt-2">saved annually from destruction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
