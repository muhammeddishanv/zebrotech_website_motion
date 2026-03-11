"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { SwatchBook, Image as ImageIcon, Wand2, BarChart3, Code2, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
    {
        title: "Brand\nStrategy",
        icon: SwatchBook,
        bgColor: "bg-purple-50 dark:bg-purple-900/10",
        textColor: "text-purple-500 dark:text-purple-400",
        iconColor: "text-purple-500 dark:text-purple-400",
    },
    {
        title: "Digital\nMarketing",
        icon: ImageIcon,
        bgColor: "bg-sky-50 dark:bg-sky-900/10",
        textColor: "text-sky-500 dark:text-sky-400",
        iconColor: "text-sky-500 dark:text-sky-400",
    },
    {
        title: "UI/UX\nDesign",
        icon: Wand2,
        bgColor: "bg-orange-50 dark:bg-orange-900/10",
        textColor: "text-orange-500 dark:text-orange-400",
        iconColor: "text-orange-500 dark:text-orange-400",
    },
    {
        title: "Analytics &\nReporting",
        icon: BarChart3,
        bgColor: "bg-lime-50 dark:bg-lime-900/10",
        textColor: "text-lime-500 dark:text-lime-400",
        iconColor: "text-lime-500 dark:text-lime-400",
    },
    {
        title: "Web\nDevelopment",
        icon: Code2,
        bgColor: "bg-rose-50 dark:bg-rose-900/10",
        textColor: "text-rose-500 dark:text-rose-400",
        iconColor: "text-rose-500 dark:text-rose-400",
    },
]

export function ServicesSection() {
    return (
        <section id="services" className="relative py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white"
                    >
                        Where innovation
                        <br />
                        meets <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">aesthetics</span>
                    </motion.h2>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={cn(
                                    "flex flex-col items-start p-10 rounded-2xl transition-colors duration-300",
                                    service.bgColor
                                )}
                            >
                                <div className={cn("mb-8", service.iconColor)}>
                                    <service.icon className="w-9 h-9" strokeWidth={1.5} />
                                </div>
                                <h3 className={cn("text-2xl md:text-3xl font-medium leading-tight whitespace-pre-line tracking-tight", service.textColor)}>
                                    {service.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-10 bg-black dark:bg-zinc-900 rounded-4xl p-10 flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="space-y-2 text-center md:text-left">
                            <h4 className="text-white text-xl md:text-2xl font-medium">
                                See Our Work in Action.
                            </h4>
                            <p className="text-zinc-400 text-lg md:text-xl">
                                Start Your Creative Journey with Us!
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            {/* Let's Collaborate Button */}
                            <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors group">
                                Let&apos;s Collaborate
                                <div className="bg-black rounded-full p-2 group-hover:rotate-45 transition-transform">
                                    <ArrowUpRight className="w-4 h-4 text-white" />
                                </div>
                            </button>

                            {/* Get Started Button */}
                            <button className="flex items-center gap-3 border border-zinc-800 text-white px-6 py-3 rounded-full font-medium hover:bg-zinc-800/50 transition-colors group">
                                Get Started
                                <div className="bg-white rounded-full p-2 group-hover:rotate-45 transition-transform">
                                    <ArrowUpRight className="w-4 h-4 text-black" />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
