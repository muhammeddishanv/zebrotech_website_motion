"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export function FooterCTA() {
    return (
        <section className="relative py-12 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden bg-linear-to-br from-blue-200/60 via-white to-yellow-200/60 dark:from-blue-950/40 dark:via-zinc-900 dark:to-yellow-950/40 p-8 md:p-12 text-center border border-zinc-200 dark:border-zinc-800"
                >

                    <div className="relative z-10 max-w-4xl mx-auto space-y-5">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-medium tracking-tight text-zinc-900 dark:text-white leading-tight"
                        >
                            Innovative solutions for <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">complex systems</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
                        >
                            Ready to scale your business? We engineer robust, scalable digital products that empower your operations and deliver measurable results through technical excellence.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex justify-center pt-6"
                        >
                            <Link href="/contact" className="group relative flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black pl-7 pr-1.5 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20">
                                Let&apos;s Collaborate
                                <div className="bg-white dark:bg-zinc-100 rounded-full p-2.5 transition-transform duration-500 group-hover:rotate-45">
                                    <ArrowUpRight className="w-4 h-4 text-black" />
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
