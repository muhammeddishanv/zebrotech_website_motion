"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { TextEffect } from "@/components/ui/text-effect"

export function HeroSection() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 500], [1, 0])

    return (
        <section className="relative min-h-auto md:min-h-screen flex items-center overflow-hidden bg-transparent">
            {/* ── Fading Background Gradient ── */}
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 -z-10 pointer-events-none"
            >
                <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
                <div 
                    className="absolute inset-0 opacity-80 sm:opacity-80 dark:opacity-40"
                    style={{
                        background: `
                            radial-gradient(circle at 15% 25%, rgba(147,197,253,0.4) 0%, transparent 60%),
                            radial-gradient(circle at 85% 20%, rgba(253,224,71,0.4) 0%, transparent 60%)
                        `
                    }}
                />
                {/* Bottom blend layer - deeper on mobile for smoother sync */}
                <div className="absolute bottom-0 left-0 right-0 h-32 md:h-64 bg-linear-to-t from-white dark:from-zinc-950 to-transparent" />
            </motion.div>

            {/* ── Content ── */}
            <div className="container mx-auto px-6 text-center max-w-5xl pt-[160px] pb-12 md:pt-40 md:pb-32">

                {/* Heading */}
                <TextEffect
                    as="h1"
                    className="text-[1.4rem] min-[400px]:text-[1.75rem] sm:text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900 dark:text-white mb-8 leading-[1.2] whitespace-nowrap sm:whitespace-normal"
                >
                    Engineering custom software
                    <br />
                    <span className="italic font-serif font-normal text-zinc-600 dark:text-zinc-300 whitespace-nowrap sm:whitespace-normal">
                        with scalability in mind
                    </span>
                </TextEffect>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="mt-6 md:mt-8 text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-[90%] sm:max-w-xl mx-auto leading-relaxed"
                >
                    At Zybrotech, we help businesses build robust digital products with{" "}
                    <span className="text-blue-500 dark:text-blue-400">modern technologies</span>,{" "}
                    guiding you from concept to deployment in a{" "}
                    <span className="text-emerald-500 dark:text-emerald-400">fast-paced world</span>.
                </motion.p>

                {/* CTA Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    {/* Get Started Button */}
                    <Link href="/contact" className="group flex items-center gap-3 h-14 pl-7 pr-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-base hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-all duration-300 active:scale-95 shadow-lg">
                        <span>Get Started</span>
                        <div className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-sm">
                            <ArrowUpRight className="w-5 h-5 text-zinc-900 dark:text-white" />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
