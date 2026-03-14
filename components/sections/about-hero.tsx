"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TextEffect } from "@/components/ui/text-effect"

export function AboutHero() {
    const { scrollY } = useScroll()
    const opacity = useTransform(scrollY, [0, 500], [1, 0])

    return (
        <section className="relative min-h-auto md:min-h-[90vh] flex items-center pt-[120px] pb-8 md:pt-20 overflow-hidden bg-transparent">
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
                            radial-gradient(circle at 85% 25%, rgba(186,230,253,0.7) 0%, transparent 60%),
                            radial-gradient(circle at 15% 20%, rgba(254,249,195,0.7) 0%, transparent 60%)
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
                        className="text-[1.25rem] min-[375px]:text-[1.4rem] min-[400px]:text-[1.5rem] sm:text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-900 dark:text-white mb-8 leading-[1.2] whitespace-nowrap sm:whitespace-normal"
                    >
                        Empowering innovation through
                        <br />
                        <span className="italic font-serif font-normal text-zinc-600 dark:text-zinc-300 whitespace-nowrap sm:whitespace-normal">
                            powerful
                        </span>{" "}
                        software solutions
                    </TextEffect>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-4xl mx-auto"
                    >
                        Zybrotech is a software development agency that helps startups and enterprises turn complex ideas into scalable, high-performance digital products.
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
