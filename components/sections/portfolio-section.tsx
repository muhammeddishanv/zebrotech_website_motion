"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const projects = [
    {
        title: "FlowBank",
        image: "/portfolio_mockup_1.png",
        tags: ["UX Research", "Interface Design"],
        color: "bg-emerald-50/50"
    },
    {
        title: "Academy.co",
        image: "/portfolio_mockup_2.png",
        tags: ["Product Design", "Interaction Design"],
        color: "bg-indigo-50/50"
    },
    {
        title: "Lumina Studio",
        image: "/portfolio_mockup_3.png",
        tags: ["Brand Identity", "Web Design"],
        color: "bg-rose-50/50"
    },
    {
        title: "Aura Commerce",
        image: "/portfolio_mockup_4.png",
        tags: ["E-commerce", "Mobile App"],
        color: "bg-amber-50/50"
    }
]

export function PortfolioSection() {
    return (
        <section id="portfolio" className="relative py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.1]"
                    >
                        How we transformed a small<br />
                        business&apos;s <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">online presence</span>
                    </motion.h2>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-24">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="group cursor-pointer"
                            >
                                <div className={cn(
                                    "relative aspect-video rounded-3xl overflow-hidden mb-8 transition-transform duration-500 group-hover:scale-[1.02]",
                                    project.color
                                )}>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Subtle overlay on hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl md:text-3xl font-medium text-zinc-900 dark:text-white">
                                        {project.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.tags.map((tag) => (
                                            <span 
                                                key={tag}
                                                className="px-5 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
