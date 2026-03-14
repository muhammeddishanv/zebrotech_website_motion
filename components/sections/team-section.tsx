"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { TextEffect } from "@/components/ui/text-effect"

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
    },
    {
        name: "Shammas",
        role: "Full Stack Developer",
        image: "/Shammas_full stack developer_new.png",
    }
]

export function TeamSection() {
    return (
        <section id="team" className="relative py-12 md:py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <TextEffect as="h2" className="text-[1.4rem] min-[400px]:text-[1.75rem] sm:text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white leading-[1.2] whitespace-nowrap sm:whitespace-normal">
                        Meet the creative minds
                        <br />
                        behind <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">our success</span>
                    </TextEffect>
                </div>

                <div className="max-w-7xl mx-auto">
                    <style>{`
                        @keyframes team-carousel-scroll {
                            from { transform: translate3d(0, 0, 0); }
                            to { transform: translate3d(-50%, 0, 0); }
                        }
                    `}</style>

                    {/* Desktop View: Grid */}
                    <div className="hidden sm:grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3">
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

                    {/* Mobile View: Carousel */}
                    <div className="sm:hidden relative w-full overflow-hidden mask-[linear-to-r(from-transparent,black_10%,black_90%,transparent)]">
                        <div
                            className="flex items-center w-max py-4"
                            style={{
                                animation: "team-carousel-scroll 10s linear infinite",
                                willChange: "transform",
                            }}
                        >
                            {[...team, ...team].map((member, index) => (
                                <div
                                    key={index}
                                    className="w-[280px] shrink-0 flex flex-col items-center text-center px-4"
                                >
                                    <div className="relative w-full h-80 mb-6">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-contain object-top"
                                            priority={index < team.length}
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
