"use client"

import { Upload, X } from "lucide-react"
import React, { useRef, useState } from "react"

interface PersonalizationFormProps {
    name: string
    title: string
    logoUrl: string
    onNameChange: (name: string) => void
    onTitleChange: (title: string) => void
    onLogoChange: (url: string) => void
}

export default function PersonalizationForm({
    name,
    title,
    logoUrl,
    onNameChange,
    onTitleChange,
    onLogoChange
}: PersonalizationFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = useState(false)

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Personalize Your Card</h3>

            {/* Name Input */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-400">
                    Name (Line 1) <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value.toUpperCase())}
                    placeholder="JOHN DOE"
                    maxLength={25}
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors uppercase tracking-wider"
                />
                <p className="text-xs text-zinc-500">{name.length}/25 characters</p>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-400">
                    Title (Line 2)
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Founder & CEO"
                    maxLength={30}
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
                <p className="text-xs text-zinc-500">{title.length}/30 characters</p>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-400">
                    Logo / Photo
                </label>

                {logoUrl ? (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10">
                        <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                        <button
                            onClick={() => onLogoChange("")}
                            className="absolute top-1 right-1 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center"
                        >
                            <X className="h-4 w-4 text-white" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragActive
                                ? "border-violet-500 bg-violet-500/10"
                                : "border-white/10 hover:border-white/20"
                            }`}
                    >
                        <Upload className="h-8 w-8 text-zinc-500 mx-auto mb-3" />
                        <p className="text-sm text-zinc-400">
                            Drag & drop your logo here, or <span className="text-violet-400">browse</span>
                        </p>
                        <p className="text-xs text-zinc-600 mt-2">PNG, JPG up to 5MB</p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                />
            </div>
        </div>
    )
}
