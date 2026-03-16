"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { TextEffect } from "@/components/ui/text-effect"

const projects = [
    {
        title: "Restaurant Management",
        image: "/restaurant_management.png",
        tags: ["POS integration", "Table management"],
        color: "bg-orange-50/50"
    },
    {
        title: "Turf booking system",
        image: "/turf_booking.png",
        tags: ["Online Booking", "Turf management"],
        color: "bg-green-50/50"
    },
    {
        title: "Dental Clinic Software",
        image: "/dental_clinic.png",
        tags: ["Appointment scheduling", "Patient records"],
        color: "bg-blue-50/50"
    },
    {
        title: "Dental Lab Software",
        image: "/dental_lab.png",
        tags: ["Case tracking", "Lab work orders"],
        color: "bg-cyan-50/50"
    },
    {
        title: "Wholesale Distribution",
        image: "/portfolio_mockup_1.png",
        tags: ["Inventory management", "Order processing"],
        color: "bg-slate-50/50"
    },
    {
        title: "Construction Management",
        image: "/portfolio_mockup_2.png",
        tags: ["Project costing", "Resource allocation"],
        color: "bg-yellow-50/50"
    },
    {
        title: "Education Management System",
        image: "/software_story_1.png",
        tags: ["Student Info System (SIS)", "Automated Grading"],
        color: "bg-purple-50/50"
    },
    {
        title: "Ecommerce Clothing Store",
        image: "/portfolio_mockup_1.png",
        tags: ["E-commerce", "Fashion UI"],
        color: "bg-stone-50/50"
    },
    {
        title: "Ecommerce Jewelry Store",
        image: "/portfolio_mockup_4.png",
        tags: ["Luxury Retail", "Jewelry UI"],
        color: "bg-yellow-50/50"
    }
]

export function PortfolioSection() {
    return (
        <section id="portfolio" className="relative py-12 md:py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <TextEffect as="h2" className="text-[1.4rem] min-[400px]:text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.2] whitespace-nowrap sm:whitespace-normal">
                        How we engineered robust<br />
                        digital <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">architectures</span>
                    </TextEffect>
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
                                className="group cursor-pointer border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-4 sm:p-8 transition-colors duration-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                            >
                                <div className={cn(
                                    "relative aspect-video rounded-2xl overflow-hidden mb-8 transition-transform duration-500 group-hover:scale-[1.01]",
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
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
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
                                    <Link href={`/contact?interest=Product Demo&project=${project.title}`} className="w-full sm:w-auto mt-2 sm:mt-0">
                                        <Button className="w-full sm:w-auto bg-black dark:bg-zinc-100 text-white dark:text-black rounded-full px-8 py-3 h-auto text-sm font-medium transition-all hover:scale-105 active:scale-95">
                                            View Demo
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
