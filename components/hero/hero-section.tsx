"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent">
            {/* Background is now provided globally by PageBackground */}

            {/* ── Content ── */}
            <div className="container mx-auto px-6 text-center max-w-5xl pt-32 pb-20 md:pt-40 md:pb-32">

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white"
                >
                    Building bold brands
                    <br className="hidden md:block" />
                    <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 sm:mt-1">
                        with{" "}
                        <span className="italic font-serif font-normal text-zinc-600 dark:text-zinc-300">
                            thoughtful design
                        </span>
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 md:mt-8 text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-[90%] sm:max-w-xl mx-auto leading-relaxed"
                >
                    At Awake, we help small startups tackle the world&apos;s biggest challenges with{" "}
                    <span className="text-blue-500 dark:text-blue-400">tailored solutions</span>,{" "}
                    guiding you from strategy to success in a{" "}
                    <span className="text-emerald-500 dark:text-emerald-400">competitive market</span>.
                </motion.p>

                {/* CTA Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    {/* Get Started Button */}
                    <button className="group flex items-center gap-3 h-14 pl-7 pr-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-base hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-all duration-300 active:scale-95 shadow-lg">
                        <span>Get Started</span>
                        <div className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-sm">
                            <ArrowUpRight className="w-5 h-5 text-zinc-900 dark:text-white" />
                        </div>
                    </button>

                    {/* Social Proof Badge */}
                    <div className="flex items-center gap-3 px-4 py-2 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-full border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm">
                        {/* Avatars */}
                        <div className="flex -space-x-2">
                            {["bg-blue-300", "bg-purple-300", "bg-amber-300", "bg-emerald-300"].map((color, i) => (
                                <div
                                    key={i}
                                    className={`w-8 h-8 rounded-full border-2 border-white dark:border-zinc-800 ${color} shrink-0`}
                                />
                            ))}
                        </div>
                        {/* Stars + Text */}
                        <div className="flex flex-col items-start leading-tight">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4].map((i) => (
                                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                ))}
                                <Star className="w-3 h-3 text-zinc-300 dark:text-zinc-600" />
                            </div>
                            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                                Trusted by 1000+ clients
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
