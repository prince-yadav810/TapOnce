"use client"

import { ArrowRight, Shield, Truck, CreditCard, Check, Package, ChevronLeft, Loader2, PartyPopper } from "lucide-react"
import React, { useState } from "react"

interface OrderSummaryProps {
    material: "metal" | "pvc" | "wood"
    name: string
    title: string
    niche: string
    templateId?: string
    templateName?: string
    logoUrl?: string
}

const materialPrices = {
    metal: 1499,
    pvc: 699,
    wood: 999
}

const materialNames = {
    metal: "Matte Black Metal",
    pvc: "Premium PVC",
    wood: "Eco Walnut"
}

type CheckoutStep = 'summary' | 'shipping' | 'payment' | 'confirmation'

export default function OrderSummary({ material, name, title, niche, templateId, templateName, logoUrl }: OrderSummaryProps) {
    const [step, setStep] = useState<CheckoutStep>('summary')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [orderNumber, setOrderNumber] = useState<number | null>(null)

    const [contact, setContact] = useState({
        phone: "",
        email: "",
        whatsapp: ""
    })

    const [shipping, setShipping] = useState({
        flat: "",
        building: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
    })

    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod')

    const price = materialPrices[material]
    const shippingCost = 0 // Free shipping
    const total = price + shippingCost

    const handleContactChange = (field: string, value: string) => {
        setContact((prev) => ({ ...prev, [field]: value }))
        setError(null)
    }

    const handleShippingChange = (field: string, value: string) => {
        setShipping((prev) => ({ ...prev, [field]: value }))
        setError(null)
    }

    const isContactValid = contact.phone.length >= 10 && contact.email.includes('@')
    const isShippingValid = shipping.city && shipping.pincode.length === 6

    const handleSubmitOrder = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/orders/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerName: name,
                    customerPhone: contact.phone,
                    customerEmail: contact.email,
                    customerWhatsapp: contact.whatsapp || contact.phone,
                    templateId: templateId || niche,
                    templateName: templateName || niche,
                    material,
                    line1Text: name,
                    line2Text: title,
                    logoUrl,
                    salePrice: total,
                    paymentMethod,
                    shippingAddress: shipping
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to place order')
            }

            setOrderNumber(data.orderNumber)
            setStep('confirmation')

        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Step 1: Order Summary Review
    if (step === 'summary') {
        return (
            <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">Order Summary</h3>

                {/* Summary Card */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Card Type</span>
                        <span className="text-white font-medium">{materialNames[material]}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Name</span>
                        <span className="text-white font-medium">{name || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Title</span>
                        <span className="text-white font-medium">{title || "—"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Category</span>
                        <span className="text-white font-medium capitalize">{niche}</span>
                    </div>
                    <hr className="border-white/10" />
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Card Price</span>
                        <span className="text-white font-medium">₹{price}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Shipping</span>
                        <span className="text-emerald-400 font-medium">FREE</span>
                    </div>
                    <hr className="border-white/10" />
                    <div className="flex justify-between text-lg">
                        <span className="text-white font-bold">Total</span>
                        <span className="text-violet-400 font-bold">₹{total}</span>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-emerald-400" />
                        Secure Checkout
                    </div>
                    <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-emerald-400" />
                        Free Shipping
                    </div>
                    <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-emerald-400" />
                        UPI, Cards, COD
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    onClick={() => setStep('shipping')}
                    disabled={!name}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-lg transition-all ${name
                            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98]"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        }`}
                >
                    Continue <ArrowRight className="h-5 w-5" />
                </button>

                {!name && (
                    <p className="text-center text-sm text-amber-400">
                        Please enter your name in Step 3 to continue
                    </p>
                )}
            </div>
        )
    }

    // Step 2: Shipping Details
    if (step === 'shipping') {
        return (
            <div className="space-y-6">
                {/* Back Button */}
                <button
                    onClick={() => setStep('summary')}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Summary
                </button>

                <h3 className="text-lg font-bold text-white">Contact & Shipping</h3>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-emerald-400">
                        <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                        </div>
                        <span>Summary</span>
                    </div>
                    <div className="flex-1 h-px bg-white/20" />
                    <div className="flex items-center gap-1 text-violet-400">
                        <div className="h-6 w-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">2</div>
                        <span>Shipping</span>
                    </div>
                    <div className="flex-1 h-px bg-white/20" />
                    <div className="flex items-center gap-1 text-zinc-500">
                        <div className="h-6 w-6 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-bold">3</div>
                        <span>Payment</span>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h4 className="font-medium text-white">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="tel"
                            placeholder="Phone Number *"
                            value={contact.phone}
                            onChange={(e) => handleContactChange("phone", e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="col-span-2 md:col-span-1 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                        />
                        <input
                            type="email"
                            placeholder="Email Address *"
                            value={contact.email}
                            onChange={(e) => handleContactChange("email", e.target.value)}
                            className="col-span-2 md:col-span-1 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                        />
                        <input
                            type="tel"
                            placeholder="WhatsApp (if different)"
                            value={contact.whatsapp}
                            onChange={(e) => handleContactChange("whatsapp", e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="col-span-2 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                        />
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                    <h4 className="font-medium text-white">Shipping Address</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Flat / House No *"
                            value={shipping.flat}
                            onChange={(e) => handleShippingChange("flat", e.target.value)}
                            className="col-span-2 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                        />
                        <input
                            type="text"
                            placeholder="Building / Society"
                            value={shipping.building}
                            onChange={(e) => handleShippingChange("building", e.target.value)}
                            className="col-span-2 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                        />
                        <input
                            type="text"
                            placeholder="Street / Locality *"
                            value={shipping.street}
                            onChange={(e) => handleShippingChange("street", e.target.value)}
                            className="col-span-2 px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                        />
                        <input
                            type="text"
                            placeholder="City *"
                            value={shipping.city}
                            onChange={(e) => handleShippingChange("city", e.target.value)}
                            className="px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                        />
                        <input
                            type="text"
                            placeholder="Pincode *"
                            value={shipping.pincode}
                            onChange={(e) => handleShippingChange("pincode", e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                        />
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    onClick={() => setStep('payment')}
                    disabled={!isContactValid || !isShippingValid}
                    className={`w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-lg transition-all ${isContactValid && isShippingValid
                            ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98]"
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        }`}
                >
                    Continue to Payment <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        )
    }

    // Step 3: Payment Selection
    if (step === 'payment') {
        return (
            <div className="space-y-6">
                {/* Back Button */}
                <button
                    onClick={() => setStep('shipping')}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Shipping
                </button>

                <h3 className="text-lg font-bold text-white">Payment Method</h3>

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1 text-emerald-400">
                        <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                        </div>
                        <span>Summary</span>
                    </div>
                    <div className="flex-1 h-px bg-emerald-500" />
                    <div className="flex items-center gap-1 text-emerald-400">
                        <div className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                        </div>
                        <span>Shipping</span>
                    </div>
                    <div className="flex-1 h-px bg-white/20" />
                    <div className="flex items-center gap-1 text-violet-400">
                        <div className="h-6 w-6 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-bold">3</div>
                        <span>Payment</span>
                    </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-3">
                    <button
                        onClick={() => setPaymentMethod('cod')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${paymentMethod === 'cod'
                                ? 'border-violet-500 bg-violet-500/10'
                                : 'border-white/10 hover:border-white/20'
                            }`}
                    >
                        <Package className="h-6 w-6 text-violet-400" />
                        <div className="text-left flex-1">
                            <div className="font-medium text-white">Cash on Delivery</div>
                            <div className="text-sm text-zinc-400">Pay when you receive the card</div>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-violet-500 bg-violet-500' : 'border-white/30'
                            }`}>
                            {paymentMethod === 'cod' && <Check className="h-3 w-3 text-white" />}
                        </div>
                    </button>

                    <button
                        onClick={() => setPaymentMethod('online')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${paymentMethod === 'online'
                                ? 'border-violet-500 bg-violet-500/10'
                                : 'border-white/10 hover:border-white/20'
                            }`}
                    >
                        <CreditCard className="h-6 w-6 text-violet-400" />
                        <div className="text-left flex-1">
                            <div className="font-medium text-white">Pay Online</div>
                            <div className="text-sm text-zinc-400">UPI, Cards, Net Banking</div>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'online' ? 'border-violet-500 bg-violet-500' : 'border-white/30'
                            }`}>
                            {paymentMethod === 'online' && <Check className="h-3 w-3 text-white" />}
                        </div>
                    </button>
                </div>

                {/* Order Summary Mini */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-sm text-zinc-400">Order Total</div>
                            <div className="text-2xl font-bold text-white">₹{total}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-zinc-400">{materialNames[material]}</div>
                            <div className="text-sm text-zinc-400">{name}</div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-3 text-sm text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
                        {error}
                    </div>
                )}

                {/* Place Order Button */}
                <button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-full font-bold text-lg transition-all bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Placing Order...
                        </>
                    ) : paymentMethod === 'cod' ? (
                        <>
                            Place Order <ArrowRight className="h-5 w-5" />
                        </>
                    ) : (
                        <>
                            Pay ₹{total} <ArrowRight className="h-5 w-5" />
                        </>
                    )}
                </button>

                <p className="text-center text-xs text-zinc-500">
                    By placing this order, you agree to our Terms of Service
                </p>
            </div>
        )
    }

    // Step 4: Order Confirmation
    if (step === 'confirmation') {
        return (
            <div className="space-y-6 text-center">
                {/* Success Animation */}
                <div className="flex justify-center">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center animate-bounce">
                        <PartyPopper className="h-10 w-10 text-white" />
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h3>
                    <p className="text-zinc-400">Thank you for your order</p>
                </div>

                {/* Order Details */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Order Number</span>
                        <span className="text-white font-bold text-lg">#{orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Card</span>
                        <span className="text-white font-medium">{materialNames[material]}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Name on Card</span>
                        <span className="text-white font-medium">{name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-zinc-400">Payment</span>
                        <span className="text-white font-medium">
                            {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </span>
                    </div>
                    <hr className="border-white/10" />
                    <div className="flex justify-between text-lg">
                        <span className="text-white font-bold">Total</span>
                        <span className="text-violet-400 font-bold">₹{total}</span>
                    </div>
                </div>

                {/* What's Next */}
                <div className="bg-zinc-900/30 rounded-xl p-4 text-left">
                    <h4 className="font-medium text-white mb-3">What happens next?</h4>
                    <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>We'll review your order within 24 hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>You'll receive your login credentials via email</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-400 mt-0.5" />
                            <span>Your card will be delivered in 5-7 business days</span>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-3">
                    <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Questions? Chat with us
                    </a>

                    <a
                        href="/"
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        )
    }

    return null
}
