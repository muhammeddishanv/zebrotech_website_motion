"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Code2, Globe, Smartphone, Palette, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TextEffect } from "@/components/ui/text-effect"

const services = [
    {
        title: "Web\nDevelopment",
        icon: Globe,
        bgColor: "bg-sky-50 dark:bg-sky-900/10",
        textColor: "text-sky-500 dark:text-sky-400",
        iconColor: "text-sky-500 dark:text-sky-400",
    },
    {
        title: "Mobile\nApps",
        icon: Smartphone,
        bgColor: "bg-purple-50 dark:bg-purple-900/10",
        textColor: "text-purple-500 dark:text-purple-400",
        iconColor: "text-purple-500 dark:text-purple-400",
    },
    {
        title: "Custom\nSoftware",
        icon: Code2,
        bgColor: "bg-orange-50 dark:bg-orange-900/10",
        textColor: "text-orange-500 dark:text-orange-400",
        iconColor: "text-orange-500 dark:text-orange-400",
    },
    {
        title: "Product\nDesigning",
        icon: Palette,
        bgColor: "bg-rose-50 dark:bg-rose-900/10",
        textColor: "text-rose-500 dark:text-rose-400",
        iconColor: "text-rose-500 dark:text-rose-400",
    },
]

interface ServicesSectionProps {
    showCTA?: boolean
}

export function ServicesSection({ showCTA = true }: ServicesSectionProps) {
    return (
        <section id="services" className="relative py-12 md:py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <TextEffect as="h2" className="text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white leading-[1.2] whitespace-nowrap sm:whitespace-normal">
                        Where logic
                        <br />
                        meets <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">scalability</span>
                    </TextEffect>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={cn(
                                    "flex flex-col items-start p-5 sm:p-8 lg:p-10 rounded-2xl transition-colors duration-300 overflow-hidden w-full",
                                    service.bgColor
                                )}
                            >
                                <div className={cn("mb-5 md:mb-8", service.iconColor)}>
                                    <service.icon className="w-8 h-8 md:w-9 md:h-9" strokeWidth={1.5} />
                                </div>
                                <h3 className={cn("text-lg min-[400px]:text-xl md:text-2xl lg:text-3xl font-medium leading-[1.15] whitespace-pre-line tracking-tight w-full", service.textColor)}>
                                    {service.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>

                    {showCTA && (
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
                                    Start Your Digital Transformation Journey with Us!
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                {/* Let's Collaborate Button */}
                                <Link href="/contact" className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-zinc-200 transition-colors group">
                                    Let&apos;s Collaborate
                                    <div className="bg-black rounded-full p-2 group-hover:rotate-45 transition-transform">
                                        <ArrowUpRight className="w-4 h-4 text-white" />
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}
