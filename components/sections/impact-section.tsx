"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Wand2, Zap, Target } from "lucide-react"

export function ImpactSection() {
    return (
        <section id="about" className="relative py-20 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    {/* Heading — constrained wide enough so each chunk stays on ONE line */}
                    <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-white whitespace-nowrap mx-auto">
                        <span className="block">Crafting exceptional, well experienced & technology</span>
                        <span className="block">driven strategies to drive impactful results with</span>
                    </h2>

                    {/* Pills */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        {/* Creativity */}
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-full 
                            bg-purple-100 dark:bg-purple-900/30
                            transition-all duration-300 hover:scale-105"
                        >
                            <Wand2 className="w-5 h-5 md:w-7 md:h-7 text-purple-500 dark:text-purple-400" />
                            <span className="text-xl md:text-3xl italic font-serif text-purple-500 dark:text-purple-300">
                                Creativity
                            </span>
                        </div>

                        {/* Innovation */}
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-full 
                            bg-sky-100 dark:bg-sky-900/30
                            transition-all duration-300 hover:scale-105"
                        >
                            <Zap className="w-5 h-5 md:w-7 md:h-7 text-sky-500 dark:text-sky-300" />
                            <span className="text-xl md:text-3xl italic font-serif text-sky-500 dark:text-sky-400">
                                Innovation
                            </span>
                        </div>

                        {/* Strategy */}
                        <div className="flex items-center gap-2.5 px-6 py-3 rounded-full 
                            bg-orange-100 dark:bg-orange-900/30
                            transition-all duration-300 hover:scale-105"
                        >
                            <Target className="w-5 h-5 md:w-7 md:h-7 text-orange-500 dark:text-orange-400" />
                            <span className="text-xl md:text-3xl italic font-serif text-orange-500 dark:text-orange-400">
                                Strategy
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
