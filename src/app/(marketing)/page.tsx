import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import LimitedEditionCTA from "@/components/showroom/LimitedEditionCTA"
import ProductCollection from "@/components/showroom/ProductCollection"
import ROICalculator from "@/components/showroom/ROICalculator"
import ShowroomHero from "@/components/showroom/ShowroomHero"
import StickyMobileCTA from "@/components/showroom/StickyMobileCTA"
import TemplateShowcase from "@/components/showroom/TemplateShowcase"
import TestimonialsSection from "@/components/showroom/TestimonialsSection"
import TrustedBy from "@/components/landing/TrustedBy"
import React from "react"

export default function LandingPage() {
   return (
      <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
         <Navbar />

         {/* 1. Hero: First Impression */}
         <ShowroomHero />

         {/* 2. Trust Signal */}
         <TrustedBy />

         {/* 3. Template Showcase: Visual Gallery */}
         <TemplateShowcase />

         {/* 4. Product Materials */}
         <ProductCollection />

         {/* 5. Social Proof */}
         <TestimonialsSection />

         {/* 6. ROI: Overcome Price Objection */}
         <ROICalculator />

         {/* 7. Final CTA */}
         <LimitedEditionCTA />

         <Footer />

         {/* Mobile Sticky CTA */}
         <StickyMobileCTA />
      </main>
   )
}
