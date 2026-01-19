"use client"

import { Upload, X, User, Briefcase } from "lucide-react"
import React, { useRef, useState } from "react"

interface PersonalizationPanelProps {
    name: string
    title: string
    logoUrl: string
    onNameChange: (name: string) => void
    onTitleChange: (title: string) => void
    onLogoChange: (url: string) => void
}

export default function PersonalizationPanel({
    name,
    title,
    logoUrl,
    onNameChange,
    onTitleChange,
    onLogoChange
}: PersonalizationPanelProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = (e) => {
                onLogoChange(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    return (
        <div className="space-y-5">
            {/* Name Input - Large and Focused */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                    <User className="h-4 w-4" />
                    Your Name
                </label>
                <div className={`relative transition-all ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onNameChange(e.target.value.toUpperCase())}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="JOHN DOE"
                        maxLength={25}
                        className="w-full px-5 py-4 bg-zinc-900/80 border border-white/10 rounded-xl text-white text-lg placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-zinc-900 transition-all uppercase tracking-wider"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-600">
                        {name.length}/25
                    </span>
                </div>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                    <Briefcase className="h-4 w-4" />
                    Your Title
                </label>
                <div className={`relative transition-all ${focusedField === 'title' ? 'scale-[1.02]' : ''}`}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        onFocus={() => setFocusedField('title')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Founder & CEO"
                        maxLength={30}
                        className="w-full px-5 py-4 bg-zinc-900/80 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-zinc-900 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-600">
                        {title.length}/30
                    </span>
                </div>
            </div>

            {/* Logo Upload - Compact */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                    <Upload className="h-4 w-4" />
                    Logo / Photo <span className="text-zinc-600">(optional)</span>
                </label>

                {logoUrl ? (
                    <div className="flex items-center gap-4 p-3 bg-zinc-900/50 border border-white/10 rounded-xl">
                        <div className="h-14 w-14 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                            <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">Logo uploaded</p>
                            <p className="text-xs text-zinc-500">Click to change</p>
                        </div>
                        <button
                            onClick={() => onLogoChange("")}
                            className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                        >
                            <X className="h-4 w-4 text-red-400" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`flex items-center gap-4 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${dragActive
                                ? "border-white bg-white/5"
                                : "border-white/10 hover:border-white/20 hover:bg-white/5"
                            }`}
                    >
                        <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                            <Upload className="h-5 w-5 text-zinc-500" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-400">
                                Drop image here or <span className="text-white">browse</span>
                            </p>
                            <p className="text-xs text-zinc-600">PNG, JPG up to 5MB</p>
                        </div>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    className="hidden"
                />
            </div>
        </div>
    )
}
