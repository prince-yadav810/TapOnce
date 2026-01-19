"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import React, { useState, useEffect } from "react"

const testimonials = [
    {
        name: "Adv. Priya Sharma",
        role: "Senior Advocate, Delhi HC",
        profession: "Lawyer",
        content: "I handed my card to a VC at a conference. The reaction when they tapped and my credentials appeared? Priceless. Got a follow-up meeting that same day.",
        rating: 5,
        avatar: "PS"
    },
    {
        name: "Dr. Vikram Mehta",
        role: "Cardiologist, Fortis Hospital",
        profession: "Doctor",
        content: "My patients are always impressed. They save my contact instantly and referrals have increased by 40%. The metal finish screams premium.",
        rating: 5,
        avatar: "VM"
    },
    {
        name: "Sneha Kapoor",
        role: "500K Followers, Lifestyle",
        profession: "Influencer",
        content: "Brand meetings are so much smoother. One tap and they have my entire media kit, all socials, and collab email. No more 'link in bio' awkwardness.",
        rating: 5,
        avatar: "SK"
    },
    {
        name: "Rajesh Agarwal",
        role: "CEO, TechVentures India",
        profession: "CEO",
        content: "First impressions matter. When I hand over my numbered Founder Edition card, it sets the tone for the entire meeting. Worth every rupee.",
        rating: 5,
        avatar: "RA"
    },
    {
        name: "Amit Desai",
        role: "Senior Broker, PropFirst",
        profession: "Broker",
        content: "I'm on site visits daily. Now clients get property photos, virtual tours, and my WhatsApp with one tap. Deals are closing faster.",
        rating: 5,
        avatar: "AD"
    }
]

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="py-24 bg-[#050505] border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                        Loved by <span className="text-violet-400">Professionals</span>
                    </h2>
                    <p className="text-zinc-400 max-w-lg mx-auto">
                        Hear from real users who have transformed their networking.
                    </p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Main Testimonial */}
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 relative"
                    >
                        <Quote className="absolute top-6 left-6 h-10 w-10 text-violet-500/20" />

                        <div className="flex gap-1 mb-6">
                            {[...Array(testimonials[current].rating)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>

                        <p className="text-lg md:text-xl text-white leading-relaxed mb-8">
                            "{testimonials[current].content}"
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center font-bold text-white">
                                {testimonials[current].avatar}
                            </div>
                            <div>
                                <div className="font-bold text-white">{testimonials[current].name}</div>
                                <div className="text-sm text-zinc-400">{testimonials[current].role}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-violet-500" : "w-2 bg-zinc-700"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
