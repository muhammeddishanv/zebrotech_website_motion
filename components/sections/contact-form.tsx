"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, ChevronDown, Loader2, Search } from "lucide-react"
import { TextEffect } from "@/components/ui/text-effect"

// ── Country data ──────────────────────────────────────────
interface Country {
    name: string
    code: string   // ISO 3166-1 alpha-2
    dial: string   // e.g. "+91"
    flag: string   // emoji
}

const COUNTRIES: Country[] = [
    { name: "India", code: "IN", dial: "+91", flag: "🇮🇳" },
    { name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
    { name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
    { name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
    { name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
    { name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
    { name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪" },
    { name: "Saudi Arabia", code: "SA", dial: "+966", flag: "🇸🇦" },
    { name: "Singapore", code: "SG", dial: "+65", flag: "🇸🇬" },
    { name: "Japan", code: "JP", dial: "+81", flag: "🇯🇵" },
    { name: "China", code: "CN", dial: "+86", flag: "🇨🇳" },
    { name: "South Korea", code: "KR", dial: "+82", flag: "🇰🇷" },
    { name: "Brazil", code: "BR", dial: "+55", flag: "🇧🇷" },
    { name: "Mexico", code: "MX", dial: "+52", flag: "🇲🇽" },
    { name: "Pakistan", code: "PK", dial: "+92", flag: "🇵🇰" },
    { name: "Bangladesh", code: "BD", dial: "+880", flag: "🇧🇩" },
    { name: "Sri Lanka", code: "LK", dial: "+94", flag: "🇱🇰" },
    { name: "Nepal", code: "NP", dial: "+977", flag: "🇳🇵" },
    { name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱" },
    { name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
    { name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
    { name: "Russia", code: "RU", dial: "+7", flag: "🇷🇺" },
    { name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦" },
    { name: "Nigeria", code: "NG", dial: "+234", flag: "🇳🇬" },
    { name: "Kenya", code: "KE", dial: "+254", flag: "🇰🇪" },
    { name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾" },
    { name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩" },
    { name: "Philippines", code: "PH", dial: "+63", flag: "🇵🇭" },
    { name: "Thailand", code: "TH", dial: "+66", flag: "🇹🇭" },
    { name: "New Zealand", code: "NZ", dial: "+64", flag: "🇳🇿" },
    { name: "Switzerland", code: "CH", dial: "+41", flag: "🇨🇭" },
    { name: "Sweden", code: "SE", dial: "+46", flag: "🇸🇪" },
    { name: "Norway", code: "NO", dial: "+47", flag: "🇳🇴" },
    { name: "Denmark", code: "DK", dial: "+45", flag: "🇩🇰" },
    { name: "Israel", code: "IL", dial: "+972", flag: "🇮🇱" },
    { name: "Turkey", code: "TR", dial: "+90", flag: "🇹🇷" },
    { name: "Qatar", code: "QA", dial: "+974", flag: "🇶🇦" },
    { name: "Kuwait", code: "KW", dial: "+965", flag: "🇰🇼" },
    { name: "Bahrain", code: "BH", dial: "+973", flag: "🇧🇭" },
]

// Map dial code prefix → country (longest match wins)
function detectCountryFromDial(raw: string): Country | null {
    if (!raw.startsWith("+")) return null
    // Try longest prefix first (+971, +966 … +1)
    for (const len of [4, 3, 2, 1]) {
        const prefix = raw.slice(0, len + 1) // "+XX…"
        const match = COUNTRIES.find(c => c.dial === prefix)
        if (match) return match
    }
    return null
}

// ── PhoneInput component ────────────────────────────────────
interface PhoneInputProps {
    value: string
    selectedCountry: Country
    customDial: string
    onNumberChange: (val: string) => void
    onCountryChange: (c: Country) => void
    onCustomDialChange: (val: string) => void
}

function PhoneInput({ value, selectedCountry, customDial, onNumberChange, onCountryChange, onCustomDialChange }: PhoneInputProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const dropRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    const filtered = COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dial.includes(search)
    )

    // Close on outside click
    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
                setOpen(false)
                setSearch("")
            }
        }
        document.addEventListener("mousedown", onClick)
        return () => document.removeEventListener("mousedown", onClick)
    }, [])

    // Scroll lock: when mouse is over the list, consume wheel events
    useEffect(() => {
        const el = listRef.current
        if (!el) return
        const handler = (e: WheelEvent) => {
            const { scrollTop, scrollHeight, clientHeight } = el
            const atTop = scrollTop === 0 && e.deltaY < 0
            const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0
            if (!atTop && !atBottom) {
                e.stopPropagation()
                e.preventDefault()
                el.scrollTop += e.deltaY
            }
        }
        el.addEventListener("wheel", handler, { passive: false })
        return () => el.removeEventListener("wheel", handler)
    }, [open])

    // Auto-detect country from number field when user types +XX
    const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let raw = e.target.value
        if (raw.startsWith("+")) {
            const detected = detectCountryFromDial(raw)
            if (detected) {
                onCountryChange(detected)
                onCustomDialChange(detected.dial)
                raw = raw.slice(detected.dial.length).replace(/\D/g, "")
            } else {
                raw = raw.replace(/[^\d+]/g, "")
            }
        } else {
            raw = raw.replace(/\D/g, "")
        }
        onNumberChange(raw)
    }

    // Handle custom dial code input
    const handleCustomDialInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value
        // Always enforce + prefix
        if (!val.startsWith("+")) {
            val = "+" + val.replace(/\D/g, "")
        } else {
            val = "+" + val.slice(1).replace(/\D/g, "")
        }

        // If user deleted everything except +, keep as +
        if (val === "+") {
            onCustomDialChange("+")
            return
        }

        if (val.length > 5) val = val.slice(0, 5)
        onCustomDialChange(val)

        // Only switch flags if the code EXACTLY matches a known country
        const exactMatch = COUNTRIES.find(c => c.dial === val)
        if (exactMatch) onCountryChange(exactMatch)
    }

    const exactMatch = COUNTRIES.find(c => c.dial === customDial)

    return (
        <div className="flex gap-2 w-full min-w-0" ref={dropRef}>
            {/* Country picker */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(o => !o)}
                    className="flex items-center gap-2 h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-4 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all whitespace-nowrap"
                >
                    {exactMatch && (
                        <span className="text-xl leading-none">{exactMatch.flag}</span>
                    )}
                    <span className="text-sm font-medium">{customDial}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                {open && (
                    <div className="absolute z-50 left-0 top-full mt-2 w-[calc(100vw-5rem)] md:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">

                        {/* Search */}
                        <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                            <input
                                autoFocus
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search country or code…"
                                className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                            />
                        </div>

                        {/* Custom dial code row */}
                        <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                            <span className="text-xs text-zinc-500 shrink-0 font-medium">Custom:</span>
                            <input
                                type="text"
                                value={customDial}
                                onChange={handleCustomDialInput}
                                placeholder="+000"
                                maxLength={5}
                                className="w-20 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
                            />
                            {customDial && !COUNTRIES.find(c => c.dial === customDial) && (
                                <span className="text-xs text-amber-500 font-medium">Custom code</span>
                            )}
                            {COUNTRIES.find(c => c.dial === customDial) && (
                                <span className="text-base leading-none">{COUNTRIES.find(c => c.dial === customDial)?.flag}</span>
                            )}
                        </div>

                        {/* Country list — scroll-isolated */}
                        <ul
                            ref={listRef}
                            className="max-h-52 overflow-y-auto overscroll-contain"
                            style={{ scrollbarWidth: "thin" }}
                        >
                            {filtered.length === 0 && (
                                <li className="px-4 py-3 text-sm text-zinc-400">No results</li>
                            )}
                            {filtered.map(c => (
                                <li key={c.code}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onCountryChange(c)
                                            onCustomDialChange(c.dial)
                                            setOpen(false)
                                            setSearch("")
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left ${selectedCountry.code === c.code ? "bg-zinc-50 dark:bg-zinc-800 font-semibold" : ""}`}
                                    >
                                        <span className="text-lg">{c.flag}</span>
                                        <span className="flex-1 text-zinc-800 dark:text-zinc-200">{c.name}</span>
                                        <span className="text-zinc-400 font-mono text-xs">{c.dial}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Number input */}
            <input
                required
                type="tel"
                inputMode="numeric"
                value={value}
                onChange={handleNumberInput}
                placeholder="Enter mobile number"
                className="flex-1 min-w-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 md:px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all text-sm md:text-base"
            />
        </div>
    )
}

// ── Main ContactForm ────────────────────────────────────────
export function ContactForm() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 500], [1, 0])

    const defaultCountry = COUNTRIES[0] // India

    const [loading, setLoading] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [customDial, setCustomDial] = useState(defaultCountry.dial)
    const [interestOpen, setInterestOpen] = useState(false)
    const interestRef = useRef<HTMLDivElement>(null)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        interest: "Web Development",
        budget: "",
        message: ""
    })

    const isIndia = customDial === "+91"
    const currencySymbol = isIndia ? "₹" : "$"

    const interestOptions = [
        "Web Development",
        "Mobile Apps",
        "Custom Software",
        "Product Designing"
    ]

    // Close interest dropdown on click outside
    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (interestRef.current && !interestRef.current.contains(e.target as Node)) {
                setInterestOpen(false)
            }
        }
        document.addEventListener("mousedown", onClick)
        return () => document.removeEventListener("mousedown", onClick)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const fullPhone = `${customDial} ${phoneNumber}`
        const budgetWithCurrency = formData.budget ? `${currencySymbol}${formData.budget}` : ""

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    budget: budgetWithCurrency,
                    phone: fullPhone
                }),
            })

            if (response.ok) {
                alert("Inquiry sent! We will get back to you soon.")
                setFormData({ name: "", email: "", interest: "Web Development", budget: "", message: "" })
                setPhoneNumber("")
                setSelectedCountry(defaultCountry)
                setCustomDial(defaultCountry.dial)
            } else {
                alert("Something went wrong. Please try again.")
            }
        } catch (err) {
            console.error(err)
            alert("An error occurred. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="relative py-12 md:py-24 bg-transparent">
            {/* ── Fading Background Gradient ── */}
            <motion.div
                style={{ opacity }}
                className="absolute -top-20 inset-x-0 bottom-0 -z-10 pointer-events-none"
            >
                <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
                <div
                    className="absolute inset-0 opacity-80 dark:opacity-40"
                    style={{
                        background: `
                            radial-gradient(circle at 15% 25%, rgba(147,197,253,0.4) 0%, transparent 60%),
                            radial-gradient(circle at 85% 20%, rgba(253,224,71,0.4) 0%, transparent 60%)
                        `
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-white dark:from-zinc-950 to-transparent" />
            </motion.div>

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <TextEffect
                        as="h1"
                        className="text-[1.75rem] min-[400px]:text-[2rem] sm:text-5xl md:text-7xl font-medium tracking-tight text-zinc-900 dark:text-white leading-[1.2] whitespace-nowrap sm:whitespace-normal"
                    >
                        Love to hear from you,<br />
                        Get in <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300 whitespace-nowrap sm:whitespace-normal">touch</span>
                    </TextEffect>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl mx-auto bg-[#FDFDFD] dark:bg-zinc-900/50 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-16 border border-zinc-100 dark:border-zinc-800 shadow-sm"
                >
                    <form className="space-y-8" onSubmit={handleFormSubmit}>

                        {/* Row 1 – Name & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">Your Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">Your Email</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
                                />
                            </div>
                        </div>

                        {/* Row 2 – Mobile Number */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">Mobile Number</label>
                            <PhoneInput
                                value={phoneNumber}
                                customDial={customDial}
                                selectedCountry={selectedCountry}
                                onNumberChange={setPhoneNumber}
                                onCountryChange={setSelectedCountry}
                                onCustomDialChange={setCustomDial}
                            />
                        </div>

                        {/* Row 3 – Interest & Budget */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">What are you interested in?</label>
                                <div className="relative" ref={interestRef}>
                                    <button
                                        type="button"
                                        onClick={() => setInterestOpen(o => !o)}
                                        className="w-full flex items-center justify-between bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-600 dark:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all text-left"
                                    >
                                        <span className="truncate">{formData.interest}</span>
                                        <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${interestOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {interestOpen && (
                                        <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {interestOptions.map(option => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, interest: option }))
                                                        setInterestOpen(false)
                                                    }}
                                                    className={`w-full text-left px-6 py-3 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ${formData.interest === option ? "text-black dark:text-white font-semibold bg-zinc-50/50 dark:bg-zinc-800/50" : "text-zinc-600 dark:text-zinc-400"}`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">Project Budget</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400 font-medium">
                                        {currencySymbol}
                                    </span>
                                    <input
                                        required
                                        type="text"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        placeholder={isIndia ? "2,00,000" : "5,000"}
                                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 4 – Message */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">Message</label>
                            <textarea
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={6}
                                placeholder="Tell us about your project…"
                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black pl-7 pr-1.5 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {loading ? "Sending..." : "Let's Collaborate"}
                                <div className="bg-white dark:bg-zinc-100 rounded-full p-2.5 transition-transform duration-500 group-hover:rotate-45">
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 text-black animate-spin" />
                                    ) : (
                                        <ArrowUpRight className="w-4 h-4 text-black" />
                                    )}
                                </div>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}
