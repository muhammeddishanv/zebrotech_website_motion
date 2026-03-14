"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
]

export function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const { theme, setTheme } = useTheme()

    // Derive active tab from pathname
    const activeTab = React.useMemo(() => {
        const currentLink = navLinks.find(link => link.href === pathname)
        return currentLink ? currentLink.name : "Home"
    }, [pathname])

    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            setScrolled(isScrolled)
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isDark = theme === "dark"

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-100 transition-all duration-300 px-6 py-6"
            )}
        >
            <nav className="max-w-7xl mx-auto flex items-center justify-between lg:justify-center">

                {/* Mobile/Tablet Logo (Left) */}
                <Link href="/" className="lg:hidden flex items-center">
                    <Image
                        src="/zybrotech-logo.webp"
                        alt="Zybrotech Logo"
                        width={140}
                        height={38}
                        className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
                        priority
                    />
                </Link>

                {/* Desktop Unified Navigation Pill */}
                <div className={cn(
                    "hidden lg:flex items-center rounded-full px-8 py-3 transition-all duration-75 relative",
                    scrolled 
                        ? "bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.3)]" 
                        : "bg-transparent border-transparent shadow-none"
                )}>
                    {/* Logo inside Pill */}
                    <Link href="/" className="flex items-center pl-4 pr-16 py-2 hover:opacity-80 transition-opacity">
                        <Image
                            src="/zybrotech-logo.webp"
                            alt="Zybrotech Logo"
                            width={120}
                            height={32}
                            className="h-6.5 w-auto object-contain dark:brightness-0 dark:invert transition-all"
                            priority
                        />
                    </Link>

                    {/* Nav Links Container (Inner Pill) */}
                    <div className="flex items-center p-1.5 rounded-full border bg-zinc-100 dark:bg-zinc-800 border-zinc-200/20 dark:border-zinc-700/20 transition-all duration-150">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative z-10 px-8 py-2.5 text-sm font-medium transition-colors duration-150 tracking-wide",
                                    activeTab === link.name
                                        ? "text-black dark:text-black"
                                        : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                                )}
                            >
                                {activeTab === link.name && (
                                    <motion.div
                                        layoutId="navbar-active-pill"
                                        className="absolute inset-0 rounded-full shadow-sm z-[-1] bg-white dark:bg-zinc-200"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Theme Toggle & Potential CTA group */}
                    <div className="flex items-center pl-16 pr-4 gap-6">
                        {mounted && (
                            <button
                                onClick={() => setTheme(isDark ? "light" : "dark")}
                                className={cn(
                                    "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150",
                                    "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border-zinc-200/50 dark:border-zinc-700/50",
                                    "border"
                                )}
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isDark ? (
                                        <motion.div
                                            key="sun"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <Sun className="w-5.5 h-5.5 text-zinc-200" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="moon"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <Moon className="w-5.5 h-5.5 text-zinc-700" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        )}
                        
                        <Link 
                            href="/contact"
                            className={cn(
                                "px-8 py-3 rounded-full text-sm font-medium hover:scale-105 transition-all duration-150 hidden xl:block shadow-lg",
                                "bg-black dark:bg-white text-white dark:text-black shadow-black/5 dark:shadow-white/5"
                            )}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>

                {/* Right side Actions (Mobile only) */}
                <div className="flex lg:hidden items-center gap-2">

                    {/* Theme Toggle - Mobile */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                            className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                                "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700",
                                "border border-zinc-200 dark:border-zinc-700"
                            )}
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.div
                                        key="sun-mobile"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Sun className="w-4 h-4 text-zinc-200" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon-mobile"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Moon className="w-4 h-4 text-zinc-700" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen
                            ? <X className="w-4 h-4 text-zinc-700 dark:text-zinc-200" />
                            : <Menu className="w-4 h-4 text-zinc-700 dark:text-zinc-200" />
                        }
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[72px] left-4 right-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-2xl lg:hidden"
                    >
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => {
                                        setIsOpen(false)
                                    }}
                                    className={cn(
                                        "text-lg font-medium px-3 py-2 rounded-xl transition-colors",
                                        activeTab === link.name
                                            ? "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
                                            : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-black dark:hover:text-white"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
