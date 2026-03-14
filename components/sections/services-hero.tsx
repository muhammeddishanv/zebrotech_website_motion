"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TextEffect } from "@/components/ui/text-effect"

export function ServicesHero() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 500], [1, 0])

    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-transparent font-sans">
            {/* ── Fading Background Gradient ── */}
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 -z-10 pointer-events-none"
            >
                <div className="absolute inset-0 bg-white dark:bg-zinc-950" />
                <div
                    className="absolute inset-0 opacity-80 dark:opacity-40"
                    style={{
                        background: `
                            radial-gradient(circle at 50% 20%, rgba(186,230,253,0.7) 0%, transparent 70%),
                            radial-gradient(circle at 20% 80%, rgba(254,249,195,0.7) 0%, transparent 60%)
                        `
                    }}
                />
                {/* Bottom blend layer */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-white dark:from-zinc-950 to-transparent" />
            </motion.div>

            <div className="container mx-auto px-3 md:px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <TextEffect
                        as="h1"
                        className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-zinc-900 dark:text-white mb-8 leading-[1.2]"
                    >
                        What we{" "}
                        <span className="whitespace-nowrap italic font-serif font-normal text-zinc-600 dark:text-zinc-300">
                            do best
                        </span>
                        <br />
                        for your brand
                    </TextEffect>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-4xl mx-auto"
                    >
                        From strategy to execution, we craft end-to-end digital experiences that move people and grow businesses.
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
