"use client"

import * as React from "react"
import { motion } from "framer-motion"

const stats = [
    { value: "150+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "5+", label: "Years of Excellence" },
    { value: "40+", label: "Global Clients" },
]

export function ServicesStats() {
    return (
        <section className="py-8 md:py-16 bg-transparent overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-7xl mx-auto rounded-[2.5rem] bg-black dark:bg-zinc-900 px-10 py-14 md:py-16"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 divide-y-2 md:divide-y-0 md:divide-x divide-zinc-800">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex flex-col items-center justify-center text-center pt-8 md:pt-0 first:pt-0 md:px-8"
                            >
                                <div className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-zinc-400 text-sm font-medium uppercase tracking-widest">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
