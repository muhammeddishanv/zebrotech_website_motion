"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "About us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Team", href: "#team" },
    { name: "Pricing", href: "#pricing" },
    { name: "Awards", href: "#awards" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [activeTab, setActiveTab] = React.useState("About us")
    const [mounted, setMounted] = React.useState(false)
    const { theme, setTheme } = useTheme()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isDark = theme === "dark"

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
                scrolled ? "py-3" : "py-5"
            )}
        >
            <nav className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center -ml-20">
                    <Image
                        src="/zybrotech-logo.webp"
                        alt="Zybrotech Logo"
                        width={160}
                        height={44}
                        className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
                        priority
                    />
                </Link>

                {/* Desktop Navigation Pill */}
                <div className="hidden lg:flex items-center bg-gray-100/80 dark:bg-zinc-800/80 backdrop-blur-md rounded-full px-2 py-1.5 border border-zinc-200/50 dark:border-zinc-700/50 relative">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setActiveTab(link.name)}
                            className={cn(
                                "relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-300",
                                activeTab === link.name
                                    ? "text-black dark:text-black"
                                    : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                            )}
                        >
                            {activeTab === link.name && (
                                <motion.div
                                    layoutId="navbar-active-pill"
                                    className="absolute inset-0 bg-white dark:bg-zinc-100 rounded-full shadow-sm z-[-1]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right side Actions */}
                <div className="flex items-center gap-2 -mr-20">
                    <div className="hidden sm:flex items-center gap-2">
                        <Button
                            variant="outline"
                            className="px-5 rounded-full border-zinc-300 dark:border-zinc-600 text-black dark:text-white bg-transparent"
                        >
                            Sign In
                        </Button>
                        <Button className="px-5 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                            Sign Up
                        </Button>
                    </div>

                    {/* Theme Toggle */}
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
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Sun className="w-4 h-4 text-zinc-200" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
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
                                        setActiveTab(link.name)
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
                            <div className="border-t border-zinc-100 dark:border-zinc-800 mt-3 pt-4 flex flex-col gap-3">
                                <Button variant="outline" className="w-full h-12 text-base">Sign In</Button>
                                <Button className="w-full h-12 text-base">Sign Up</Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
