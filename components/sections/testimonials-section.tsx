"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TextEffect } from "@/components/ui/text-effect"

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="relative py-12 md:py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <TextEffect as="h2" className="text-[1.5rem] min-[400px]:text-[1.75rem] sm:text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white leading-[1.2] whitespace-nowrap sm:whitespace-normal">
                        What our satisfied customers
                        <br />
                        are saying <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">about us</span>
                    </TextEffect>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Main Customer Story (Top Left) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="md:col-span-8 relative min-h-[400px] rounded-4xl overflow-hidden group bg-zinc-900"
                        >
                            <Image
                                src="/software_story_1.png"
                                alt="Software Success Story"
                                fill
                                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                                <span className="text-white/60 text-xs font-medium uppercase tracking-widest">Digital Transformation</span>
                                <div className="max-w-xl space-y-4">
                                    <h3 className="text-white text-3xl md:text-4xl font-medium leading-tight">
                                        &quot;Zybrotech&apos;s engineering team delivered a scalable platform that handled 10x our peak traffic seamlessly.&quot;
                                    </h3>
                                    <div className="space-y-1">
                                        <p className="text-white font-medium">Ananya Shah</p>
                                        <p className="text-white/60 text-sm">CTO of TechFlow Solutions</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
 
                        {/* Facts & Numbers (Top Right) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="md:col-span-4 bg-yellow-200 rounded-4xl p-10 flex flex-col justify-between min-h-[300px]"
                        >
                            <span className="text-black/40 text-xs font-medium uppercase tracking-widest">Performance Metrics</span>
                            <div className="space-y-2">
                                <div className="text-7xl font-medium text-black tracking-tighter">98%</div>
                                <p className="text-black/80 font-medium leading-tight">
                                    Average improvement in application load times for our partners.
                                </p>
                            </div>
                        </motion.div>
 
                        {/* Small Brand Story (Bottom Left) */}
                        <motion.div
                            initial={{ opacity: 0, x: -50, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="md:col-span-4 bg-zinc-900 rounded-4xl p-8 md:p-10 flex flex-col justify-between min-h-[450px]"
                        >
                            <div className="space-y-6">
                                <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Architecture</span>
                                <p className="text-white text-xl md:text-2xl font-medium leading-snug">
                                    The clean architecture they built is maintainable, secure, and remarkably fast!
                                </p>
                            </div>
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mt-8">
                                <Image
                                    src="/software_showcase.png"
                                    alt="Software Dashboard Showcase"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
 
                        {/* Large Quote (Bottom Right) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="md:col-span-8 bg-zinc-100 dark:bg-zinc-900 rounded-4xl p-10 md:p-16 flex flex-col justify-center min-h-[450px]"
                        >
                            <div className="space-y-8">
                                <span className="text-zinc-400 text-xs font-medium uppercase tracking-widest">Engineering Excellence</span>
                                <h3 className="text-zinc-900 dark:text-white text-3xl md:text-5xl font-medium leading-[1.15] tracking-tight">
                                    &quot;Zybrotech brought our technical vision to life with precision engineering and deep domain expertise, exceeding all our benchmarks.&quot;
                                </h3>
                                <div className="space-y-1">
                                    <p className="text-zinc-900 dark:text-white font-medium">Kabir Shah</p>
                                    <p className="text-zinc-400 text-sm">Head of Engineering at CloudScale</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
