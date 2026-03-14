"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
    SwatchBook,
    Wand2,
    Code2,
    BarChart3,
    Megaphone,
    Smartphone,
    ArrowUpRight,
    Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
    {
        id: "01",
        icon: Code2,
        title: "Web Development",
        subtitle: "Highly Scalable Apps",
        description:
            "Developing high-performance websites and web applications with modern tech stacks like React, Next.js, and Node.js for seamless performance.",
        features: ["Enterprise React Apps", "Full-stack Development", "API Integrations", "Optimized Web Performance"],
        color: "from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20",
        iconBg: "bg-purple-100 dark:bg-purple-900/40",
        iconColor: "text-purple-500",
        accentColor: "bg-purple-500",
        tagBg: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    },
    {
        id: "02",
        icon: Smartphone,
        title: "Mobile Apps",
        subtitle: "iOS & Android Solutions",
        description:
            "Creating intuitive and powerful mobile applications using React Native and Flutter, ensuring a native feel across all devices and platforms.",
        features: ["Cross-platform Development", "Native Performance", "App Store Deployment", "Post-launch Support"],
        color: "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
        iconBg: "bg-orange-100 dark:bg-orange-900/40",
        iconColor: "text-orange-500",
        accentColor: "bg-orange-500",
        tagBg: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    },
    {
        id: "03",
        icon: Wand2,
        title: "System Architecture",
        subtitle: "Robust Design",
        description:
            "Designing complex backend systems and database architectures that are built to scale, ensuring your application remains fast as it grows.",
        features: ["Microservices Architecture", "Database Optimization", "Serverless Computing", "Security First Design"],
        color: "from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20",
        iconBg: "bg-rose-100 dark:bg-rose-900/40",
        iconColor: "text-rose-500",
        accentColor: "bg-rose-500",
        tagBg: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300",
    },
    {
        id: "04",
        icon: BarChart3,
        title: "Data Engineering",
        subtitle: "Insights at Scale",
        description:
            "Implementing advanced data pipelines and analytics solutions that help your business make data-driven decisions based on real-time information.",
        features: ["Big Data Processing", "Real-time Analytics", "ETL Pipelines", "Data Warehouse Design"],
        color: "from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20",
        iconBg: "bg-sky-100 dark:bg-sky-900/40",
        iconColor: "text-sky-500",
        accentColor: "bg-sky-500",
        tagBg: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300",
    },
    {
        id: "05",
        icon: Megaphone,
        title: "DevOps & Cloud",
        subtitle: "Seamless Deployment",
        description:
            "Automating your deployment cycles with CI/CD and managing cloud infrastructure on AWS/Azure to ensure 99.9% uptime and security.",
        features: ["CI/CD Pipelines", "Docker & Kubernetes", "Cloud Security", "Infrastructure as Code"],
        color: "from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20",
        iconBg: "bg-lime-100 dark:bg-lime-900/40",
        iconColor: "text-lime-600",
        accentColor: "bg-lime-500",
        tagBg: "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300",
    },
    {
        id: "06",
        icon: SwatchBook,
        title: "Custom Software",
        subtitle: "Tailored for Success",
        description:
            "Crafting bespoke software solutions that solve unique business challenges, from internal tools to massive customer-facing platforms.",
        features: ["Tailored Solutions", "Legacy Upgrades", "Scalable Platforms", "Ongoing Maintenance"],
        color: "from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20",
        iconBg: "bg-teal-100 dark:bg-teal-900/40",
        iconColor: "text-teal-600",
        accentColor: "bg-teal-500",
        tagBg: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
    },
]

const containerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12 },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } },
}

export function ServicesDetail() {
    return (
        <section className="py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 dark:text-white"
                    >
                        Our full suite of{" "}
                        <br />
                        <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">
                            capabilities
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-6 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto"
                    >
                        Every service is crafted with care, backed by strategy, and designed to deliver real results.
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            className={cn(
                                "group relative rounded-3xl p-8 md:p-10 bg-gradient-to-br border border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all duration-500 cursor-pointer overflow-hidden",
                                service.color
                            )}
                        >
                            {/* Service Number */}
                            <span className="absolute top-8 right-8 text-xs font-bold tracking-widest text-zinc-300 dark:text-zinc-600">
                                {service.id}
                            </span>

                            {/* Icon */}
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110", service.iconBg)}>
                                <service.icon className={cn("w-7 h-7", service.iconColor)} strokeWidth={1.5} />
                            </div>

                            {/* Text */}
                            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                                {service.subtitle}
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
                                {service.title}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base mb-8">
                                {service.description}
                            </p>

                            {/* Feature list */}
                            <ul className="space-y-2">
                                {service.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                                        <span className={cn("w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center", service.accentColor)}>
                                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* Arrow hover indicator */}
                            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4 text-white dark:text-zinc-900" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
