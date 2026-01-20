// Card Template Data Structure
// Each profession has multiple template variants with unique styling

export type CardTemplate = {
    id: string
    name: string
    profession: string
    professionId: string
    description: string
    // Visual Styling
    gradient: string
    accentColor: string
    textColor: string
    fontFamily: string
    fontStyle: "modern" | "classic" | "bold" | "elegant" | "minimal"
    // Icon/Symbol
    icon: string // Lucide icon name or SVG path
    iconPosition: "top-left" | "top-right" | "bottom-right" | "watermark"
    // Layout
    layout: "classic" | "minimal" | "bold" | "centered" | "split"
    // Material compatibility
    materials: ("metal" | "pvc" | "wood")[]
    // Popularity
    popular: boolean
}

// =====================================================
// LEGAL / LAWYER TEMPLATES
// =====================================================
export const legalTemplates: CardTemplate[] = [
    {
        id: "legal-justice",
        name: "Justice Scale",
        profession: "Legal",
        professionId: "legal",
        description: "Classic scales of justice with serif typography",
        gradient: "from-amber-900 via-yellow-900 to-black",
        accentColor: "amber",
        textColor: "white",
        fontFamily: "font-serif",
        fontStyle: "classic",
        icon: "Scale",
        iconPosition: "top-right",
        layout: "classic",
        materials: ["metal", "pvc", "wood"],
        popular: true
    },
    {
        id: "legal-gavel",
        name: "Gavel Authority",
        profession: "Legal",
        professionId: "legal",
        description: "Powerful gavel motif with bold presence",
        gradient: "from-zinc-900 via-gray-900 to-black",
        accentColor: "amber",
        textColor: "white",
        fontFamily: "font-serif",
        fontStyle: "bold",
        icon: "Gavel",
        iconPosition: "bottom-right",
        layout: "bold",
        materials: ["metal", "pvc"],
        popular: false
    },
    {
        id: "legal-columns",
        name: "Courthouse Columns",
        profession: "Legal",
        professionId: "legal",
        description: "Greek column pattern symbolizing law and order",
        gradient: "from-slate-800 via-slate-900 to-black",
        accentColor: "slate",
        textColor: "white",
        fontFamily: "font-serif",
        fontStyle: "elegant",
        icon: "Building2",
        iconPosition: "watermark",
        layout: "minimal",
        materials: ["metal", "pvc", "wood"],
        popular: false
    },
    {
        id: "legal-scroll",
        name: "Legal Scroll",
        profession: "Legal",
        professionId: "legal",
        description: "Document scroll with quill accent",
        gradient: "from-stone-800 via-stone-900 to-black",
        accentColor: "stone",
        textColor: "white",
        fontFamily: "font-serif",
        fontStyle: "classic",
        icon: "ScrollText",
        iconPosition: "top-left",
        layout: "classic",
        materials: ["wood", "pvc"],
        popular: false
    },
    {
        id: "legal-modern",
        name: "Modern Counsel",
        profession: "Legal",
        professionId: "legal",
        description: "Contemporary design for modern law firms",
        gradient: "from-blue-950 via-indigo-950 to-black",
        accentColor: "blue",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "modern",
        icon: "Briefcase",
        iconPosition: "top-right",
        layout: "minimal",
        materials: ["metal", "pvc"],
        popular: true
    }
]

// =====================================================
// HEALTHCARE / DOCTOR TEMPLATES
// =====================================================
export const healthcareTemplates: CardTemplate[] = [
    {
        id: "health-caduceus",
        name: "Caduceus Classic",
        profession: "Healthcare",
        professionId: "healthcare",
        description: "Traditional medical symbol with clean design",
        gradient: "from-emerald-900 via-teal-900 to-black",
        accentColor: "emerald",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "modern",
        icon: "Stethoscope",
        iconPosition: "top-right",
        layout: "classic",
        materials: ["metal", "pvc", "wood"],
        popular: true
    },
    {
        id: "health-pulse",
        name: "Pulse Line",
        profession: "Healthcare",
        professionId: "healthcare",
        description: "Dynamic heartbeat pattern for cardiologists",
        gradient: "from-red-950 via-rose-950 to-black",
        accentColor: "red",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "bold",
        icon: "Activity",
        iconPosition: "watermark",
        layout: "bold",
        materials: ["metal", "pvc"],
        popular: false
    },
    {
        id: "health-cross",
        name: "Medical Cross",
        profession: "Healthcare",
        professionId: "healthcare",
        description: "Simple cross motif for all medical professionals",
        gradient: "from-cyan-900 via-cyan-950 to-black",
        accentColor: "cyan",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "minimal",
        icon: "Cross",
        iconPosition: "top-left",
        layout: "minimal",
        materials: ["pvc", "wood"],
        popular: false
    },
    {
        id: "health-dna",
        name: "DNA Helix",
        profession: "Healthcare",
        professionId: "healthcare",
        description: "Modern design for specialists and researchers",
        gradient: "from-purple-950 via-violet-950 to-black",
        accentColor: "purple",
        textColor: "white",
        fontFamily: "font-mono",
        fontStyle: "modern",
        icon: "Dna",
        iconPosition: "watermark",
        layout: "centered",
        materials: ["metal", "pvc"],
        popular: true
    },
    {
        id: "health-dental",
        name: "Dental Care",
        profession: "Healthcare",
        professionId: "healthcare",
        description: "Clean design for dental professionals",
        gradient: "from-sky-900 via-sky-950 to-black",
        accentColor: "sky",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "elegant",
        icon: "Smile",
        iconPosition: "top-right",
        layout: "classic",
        materials: ["pvc", "wood"],
        popular: false
    }
]

// =====================================================
// CORPORATE / CEO TEMPLATES
// =====================================================
export const corporateTemplates: CardTemplate[] = [
    {
        id: "corp-executive",
        name: "Executive Black",
        profession: "Corporate",
        professionId: "corporate",
        description: "Premium matte black for C-suite executives",
        gradient: "from-zinc-900 via-neutral-900 to-black",
        accentColor: "zinc",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "elegant",
        icon: "Building2",
        iconPosition: "top-right",
        layout: "minimal",
        materials: ["metal"],
        popular: true
    },
    {
        id: "corp-gold",
        name: "Gold Standard",
        profession: "Corporate",
        professionId: "corporate",
        description: "Luxurious gold accents for high-profile leaders",
        gradient: "from-yellow-900 via-amber-900 to-black",
        accentColor: "yellow",
        textColor: "white",
        fontFamily: "font-serif",
        fontStyle: "elegant",
        icon: "Crown",
        iconPosition: "top-left",
        layout: "classic",
        materials: ["metal", "pvc"],
        popular: true
    },
    {
        id: "corp-startup",
        name: "Startup Founder",
        profession: "Corporate",
        professionId: "corporate",
        description: "Modern gradient for tech founders",
        gradient: "from-violet-900 via-purple-900 to-black",
        accentColor: "violet",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "modern",
        icon: "Rocket",
        iconPosition: "top-right",
        layout: "bold",
        materials: ["metal", "pvc", "wood"],
        popular: false
    },
    {
        id: "corp-finance",
        name: "Finance Elite",
        profession: "Corporate",
        professionId: "corporate",
        description: "Conservative design for finance professionals",
        gradient: "from-slate-900 via-gray-900 to-black",
        accentColor: "slate",
        textColor: "white",
        fontFamily: "font-serif",
        fontStyle: "classic",
        icon: "TrendingUp",
        iconPosition: "bottom-right",
        layout: "classic",
        materials: ["metal", "pvc"],
        popular: false
    },
    {
        id: "corp-consultant",
        name: "Consultant Pro",
        profession: "Corporate",
        professionId: "corporate",
        description: "Clean and professional for consultants",
        gradient: "from-blue-950 via-indigo-950 to-black",
        accentColor: "blue",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "minimal",
        icon: "Briefcase",
        iconPosition: "top-right",
        layout: "minimal",
        materials: ["pvc", "wood"],
        popular: false
    }
]

// =====================================================
// CREATIVE / DESIGNER TEMPLATES
// =====================================================
export const creativeTemplates: CardTemplate[] = [
    {
        id: "creative-gradient",
        name: "Gradient Flow",
        profession: "Creative",
        professionId: "creative",
        description: "Vibrant gradient for bold creatives",
        gradient: "from-fuchsia-900 via-pink-900 to-purple-900",
        accentColor: "fuchsia",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "modern",
        icon: "Palette",
        iconPosition: "watermark",
        layout: "bold",
        materials: ["metal", "pvc", "wood"],
        popular: true
    },
    {
        id: "creative-minimal",
        name: "Minimal Studio",
        profession: "Creative",
        professionId: "creative",
        description: "Clean whitespace-focused design",
        gradient: "from-neutral-900 via-neutral-950 to-black",
        accentColor: "neutral",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "minimal",
        icon: "Pencil",
        iconPosition: "top-left",
        layout: "minimal",
        materials: ["pvc", "wood"],
        popular: false
    },
    {
        id: "creative-photo",
        name: "Photographer Pro",
        profession: "Creative",
        professionId: "creative",
        description: "Aperture motif for photographers",
        gradient: "from-gray-900 via-zinc-900 to-black",
        accentColor: "gray",
        textColor: "white",
        fontFamily: "font-mono",
        fontStyle: "modern",
        icon: "Camera",
        iconPosition: "top-right",
        layout: "centered",
        materials: ["metal", "pvc"],
        popular: true
    },
    {
        id: "creative-neon",
        name: "Neon Dreams",
        profession: "Creative",
        professionId: "creative",
        description: "Cyberpunk-inspired for digital artists",
        gradient: "from-cyan-900 via-blue-900 to-purple-900",
        accentColor: "cyan",
        textColor: "white",
        fontFamily: "font-mono",
        fontStyle: "bold",
        icon: "Zap",
        iconPosition: "bottom-right",
        layout: "bold",
        materials: ["pvc"],
        popular: false
    },
    {
        id: "creative-film",
        name: "Filmmaker Reel",
        profession: "Creative",
        professionId: "creative",
        description: "Film strip motif for video creators",
        gradient: "from-red-950 via-orange-950 to-black",
        accentColor: "red",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "elegant",
        icon: "Film",
        iconPosition: "top-right",
        layout: "classic",
        materials: ["metal", "pvc", "wood"],
        popular: false
    }
]

// =====================================================
// REAL ESTATE TEMPLATES
// =====================================================
export const realEstateTemplates: CardTemplate[] = [
    {
        id: "realestate-luxury",
        name: "Luxury Homes",
        profession: "Real Estate",
        professionId: "realestate",
        description: "Premium design for luxury property agents",
        gradient: "from-amber-900 via-yellow-900 to-black",
        accentColor: "amber",
        textColor: "white",
        fontFamily: "font-serif",
        fontStyle: "elegant",
        icon: "Home",
        iconPosition: "top-right",
        layout: "classic",
        materials: ["metal", "pvc"],
        popular: true
    },
    {
        id: "realestate-modern",
        name: "Modern Living",
        profession: "Real Estate",
        professionId: "realestate",
        description: "Contemporary design for urban properties",
        gradient: "from-blue-950 via-cyan-950 to-black",
        accentColor: "blue",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "modern",
        icon: "Building",
        iconPosition: "watermark",
        layout: "minimal",
        materials: ["metal", "pvc", "wood"],
        popular: true
    },
    {
        id: "realestate-key",
        name: "Golden Key",
        profession: "Real Estate",
        professionId: "realestate",
        description: "Key motif symbolizing home ownership",
        gradient: "from-yellow-900 via-orange-900 to-black",
        accentColor: "yellow",
        textColor: "white",
        fontFamily: "font-serif",
        fontStyle: "classic",
        icon: "Key",
        iconPosition: "top-left",
        layout: "classic",
        materials: ["metal", "wood"],
        popular: false
    },
    {
        id: "realestate-commercial",
        name: "Commercial Pro",
        profession: "Real Estate",
        professionId: "realestate",
        description: "Professional design for commercial brokers",
        gradient: "from-slate-900 via-gray-900 to-black",
        accentColor: "slate",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "bold",
        icon: "Building2",
        iconPosition: "top-right",
        layout: "bold",
        materials: ["pvc"],
        popular: false
    },
    {
        id: "realestate-green",
        name: "Eco Properties",
        profession: "Real Estate",
        professionId: "realestate",
        description: "Nature-inspired for sustainable housing",
        gradient: "from-green-900 via-emerald-900 to-black",
        accentColor: "green",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "minimal",
        icon: "TreePine",
        iconPosition: "watermark",
        layout: "minimal",
        materials: ["wood", "pvc"],
        popular: false
    }
]

// =====================================================
// INFLUENCER / CONTENT CREATOR TEMPLATES
// =====================================================
export const influencerTemplates: CardTemplate[] = [
    {
        id: "influencer-social",
        name: "Social Star",
        profession: "Influencer",
        professionId: "influencer",
        description: "Vibrant design for social media personalities",
        gradient: "from-pink-900 via-rose-900 to-purple-900",
        accentColor: "pink",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "bold",
        icon: "Heart",
        iconPosition: "top-right",
        layout: "bold",
        materials: ["pvc", "metal"],
        popular: true
    },
    {
        id: "influencer-youtube",
        name: "Creator Studio",
        profession: "Influencer",
        professionId: "influencer",
        description: "Play button motif for video creators",
        gradient: "from-red-900 via-red-950 to-black",
        accentColor: "red",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "modern",
        icon: "Play",
        iconPosition: "watermark",
        layout: "centered",
        materials: ["pvc", "metal"],
        popular: true
    },
    {
        id: "influencer-lifestyle",
        name: "Lifestyle Lux",
        profession: "Influencer",
        professionId: "influencer",
        description: "Elegant design for lifestyle influencers",
        gradient: "from-rose-900 via-pink-950 to-black",
        accentColor: "rose",
        textColor: "white",
        fontFamily: "font-serif",
        fontStyle: "elegant",
        icon: "Sparkles",
        iconPosition: "top-left",
        layout: "classic",
        materials: ["metal", "wood"],
        popular: false
    },
    {
        id: "influencer-podcast",
        name: "Podcast Host",
        profession: "Influencer",
        professionId: "influencer",
        description: "Microphone motif for podcast creators",
        gradient: "from-violet-950 via-purple-950 to-black",
        accentColor: "violet",
        textColor: "white",
        fontFamily: "font-sans",
        fontStyle: "modern",
        icon: "Mic",
        iconPosition: "top-right",
        layout: "minimal",
        materials: ["pvc"],
        popular: false
    },
    {
        id: "influencer-gaming",
        name: "Gamer Pro",
        profession: "Influencer",
        professionId: "influencer",
        description: "Gaming-inspired for streamers",
        gradient: "from-green-900 via-emerald-900 to-black",
        accentColor: "green",
        textColor: "white",
        fontFamily: "font-mono",
        fontStyle: "bold",
        icon: "Gamepad2",
        iconPosition: "bottom-right",
        layout: "bold",
        materials: ["pvc"],
        popular: false
    }
]

// =====================================================
// ALL TEMPLATES COMBINED
// =====================================================
export const allTemplates: CardTemplate[] = [
    ...legalTemplates,
    ...healthcareTemplates,
    ...corporateTemplates,
    ...creativeTemplates,
    ...realEstateTemplates,
    ...influencerTemplates
]

// Get templates by profession
export const getTemplatesByProfession = (professionId: string): CardTemplate[] => {
    return allTemplates.filter(t => t.professionId === professionId)
}

// Get popular templates
export const getPopularTemplates = (): CardTemplate[] => {
    return allTemplates.filter(t => t.popular)
}

// Profession list for navigation
export const professions = [
    { id: "legal", name: "Legal & Law", icon: "Scale" },
    { id: "healthcare", name: "Healthcare", icon: "Stethoscope" },
    { id: "corporate", name: "Corporate", icon: "Building2" },
    { id: "creative", name: "Creative", icon: "Palette" },
    { id: "realestate", name: "Real Estate", icon: "Home" },
    { id: "influencer", name: "Influencer", icon: "Camera" }
]
