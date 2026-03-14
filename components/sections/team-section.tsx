"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const team = [
    {
        name: "Dishan",
        role: "Full Stack Developer",
        image: "/dishan_full stack developer.png",
    },
    {
        name: "Nishal",
        role: "Backend Developer",
        image: "/nishan_backend developer.png",
    },
    {
        name: "Farseen",
        role: "Angular Developer",
        image: "/farseen_angular developer.png",
    },
    {
        name: "Muhsin",
        role: "UI/UX Designer",
        image: "/Muhsin_ uiux_designer - Copy new.png",
    }
]

export function TeamSection() {
    return (
        <section id="team" className="relative py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white"
                    >
                        Meet the creative minds
                        <br />
                        behind <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">our success</span>
                    </motion.h2>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="group flex flex-col items-center text-center"
                            >
                                <div className="relative w-full h-80 mb-6">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-contain object-top transition-all duration-500 group-hover:grayscale"
                                        priority
                                    />
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-medium text-zinc-900 dark:text-white">
                                        {member.name}
                                    </h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                                        {member.role}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
