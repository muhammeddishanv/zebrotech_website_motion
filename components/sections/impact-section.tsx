"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Wand2, Zap, Target } from "lucide-react"
import { TextEffect } from "@/components/ui/text-effect"

interface IImpactSectionProps {
    linkText?: string
    showLink?: boolean
    children?: React.ReactNode
}

export function ImpactSection({
    linkText = "Learn more",
    showLink = true,
    children
}: IImpactSectionProps) {
    return (
        <section id="about" className="relative py-6 md:py-20 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    {/* Heading — constrained wide enough so each chunk stays on ONE line */}
                    <TextEffect as="h2" className="text-[1.5rem] min-[400px]:text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
                        Building robust applications
                        <br />
                        <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2">
                            with{" "}
                            <span className="italic font-serif font-normal text-zinc-500 dark:text-zinc-400">
                                technical expertise
                            </span>
                        </span>
                    </TextEffect>

                    {/* Pills */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        {/* Agility */}
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-full 
                            bg-purple-100 dark:bg-purple-900/30
                            transition-all duration-300 hover:scale-105"
                        >
                            <Zap className="w-5 h-5 md:w-7 md:h-7 text-purple-500 dark:text-purple-400" />
                            <span className="text-xl md:text-3xl italic font-serif text-purple-500 dark:text-purple-300">
                                Agility
                            </span>
                        </div>

                        {/* Reliability */}
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-full 
                            bg-sky-100 dark:bg-sky-900/30
                            transition-all duration-300 hover:scale-105"
                        >
                            <Target className="w-5 h-5 md:w-7 md:h-7 text-sky-500 dark:text-sky-300" />
                            <span className="text-xl md:text-3xl italic font-serif text-sky-500 dark:text-sky-400">
                                Reliability
                            </span>
                        </div>

                        {/* Performance */}
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-full 
                            bg-orange-100 dark:bg-orange-900/30
                            transition-all duration-300 hover:scale-105"
                        >
                            <Zap className="w-5 h-5 md:w-7 md:h-7 text-orange-500 dark:text-orange-400" />
                            <span className="text-xl md:text-3xl italic font-serif text-orange-500 dark:text-orange-400">
                                Performance
                            </span>
                        </div>
                    </div>
                    {/* Learn More Link */}
                    {showLink && (
                        <div className="mt-16">
                            <motion.a
                                href="/about"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-lg border-b-2 border-zinc-200 dark:border-zinc-800 pb-1"
                            >
                                {linkText}
                                <span className="text-xl">→</span>
                            </motion.a>
                        </div>
                    )}

                    {/* Extra Content */}
                    {children && (
                        <div className="mt-20 text-center">
                            {children}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
