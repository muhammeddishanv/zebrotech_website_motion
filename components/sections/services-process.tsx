"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Search, Compass, Sparkles, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { TextEffect } from "@/components/ui/text-effect"

const steps = [
    {
        number: "01",
        title: "Discovery",
        description: "We analyze your requirements, business logic, and technical constraints to define the project scope and technical roadmap.",
        color: "from-purple-500 to-indigo-600",
        shadow: "shadow-purple-500/20",
        icon: Search,
    },
    {
        number: "02",
        title: "Architecture",
        description: "Our engineers design a robust system architecture, selecting the right tech stack and database schema for long-term scalability.",
        color: "from-sky-500 to-blue-600",
        shadow: "shadow-sky-500/20",
        icon: Compass,
    },
    {
        number: "03",
        title: "Development",
        description: "We build your product using agile sprints, focusing on clean code, automated testing, and high performance from day one.",
        color: "from-orange-500 to-amber-600",
        shadow: "shadow-orange-500/20",
        icon: Sparkles,
    },
    {
        number: "04",
        title: "Deployment",
        description: "We handle CI/CD setup, cloud infrastructure, and final security audits to ensure a smooth, stable, and secure go-live.",
        color: "from-emerald-500 to-teal-600",
        shadow: "shadow-emerald-500/20",
        icon: Rocket,
    },
]

export function ServicesProcess() {
    return (
        <section className="py-12 md:py-24 relative overflow-hidden bg-white dark:bg-zinc-950">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30 dark:opacity-20 transition-opacity duration-1000">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center mb-24 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                                Our Methodology
                            </span>
                            <div className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
                        </motion.div>
                        
                        <TextEffect
                            as="h2"
                            className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-8"
                        >
                            How we{" "}
                            <span className="italic font-serif font-normal text-zinc-400 dark:text-zinc-500">
                                work
                            </span>
                        </TextEffect>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl"
                        >
                            A rigorous four-step engineering process designed to build complex systems and deliver scalable software through agile collaboration.
                        </motion.p>
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    duration: 0.7, 
                                    delay: index * 0.15, 
                                    ease: [0.22, 1, 0.36, 1] 
                                }}
                                className="group relative flex flex-col items-start p-10 rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-black/50 hover:-translate-y-2 backdrop-blur-sm"
                            >
                                {/* Step Icon & Number */}
                                <div className="w-full flex justify-between items-start mb-10">
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl bg-linear-to-br flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg",
                                        step.color,
                                        step.shadow
                                    )}>
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <span className="text-6xl font-black text-zinc-200/50 dark:text-zinc-800/50 transition-colors duration-500 group-hover:text-zinc-300 dark:group-hover:text-zinc-700 select-none">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>



                                {/* Decorative Background Gradient (only on hover) */}
                                <div className={cn(
                                    "absolute inset-0 -z-10 rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-5 blur-3xl bg-linear-to-br",
                                    step.color
                                )} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

