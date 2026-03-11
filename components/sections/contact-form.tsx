"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"

export function ContactForm() {
    return (
        <section className="relative py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tight text-zinc-900 dark:text-white leading-tight"
                    >
                        Love to hear from you,<br />
                        Get in <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">touch</span>
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl mx-auto bg-[#FDFDFD] dark:bg-zinc-900/50 rounded-[2.5rem] p-10 md:p-16 border border-zinc-100 dark:border-zinc-800 shadow-sm"
                >
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">Your Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Interest Dropdown */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">What are you interested in?</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-600 dark:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all cursor-pointer">
                                        <option>design & branding</option>
                                        <option>web development</option>
                                        <option>mobile apps</option>
                                        <option>ai solutions</option>
                                    </select>
                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Budget Dropdown */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">Project budget</label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-600 dark:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all cursor-pointer">
                                        <option>$10000</option>
                                        <option>$20000</option>
                                        <option>$50000</option>
                                        <option>$100000+</option>
                                    </select>
                                    <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-zinc-900 dark:text-white ml-1">Message</label>
                            <textarea
                                rows={6}
                                placeholder="Let tell us know your project about"
                                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black/5 dark:focus:ring-white/5 transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button className="group relative flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black pl-7 pr-1.5 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20">
                                Let&apos;s Collaborate
                                <div className="bg-white dark:bg-zinc-100 rounded-full p-2.5 transition-transform duration-500 group-hover:rotate-45">
                                    <ArrowUpRight className="w-4 h-4 text-black" />
                                </div>
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}
