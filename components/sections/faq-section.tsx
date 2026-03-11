"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
    {
        question: "What services does Zybrotech offer?",
        answer: "We offer a comprehensive range of digital services including Brand Strategy, Digital Marketing, UI/UX Design, Analytics & Reporting, and Full-stack Web Development."
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on complexity, but most initial phases (like discovery and design) take 2-4 weeks, with full development generally ranging from 6-12 weeks."
    },
    {
        question: "How is pricing structured at Zybrotech?",
        answer: "We provide customized pricing based on your specific project requirements, goals, and complexity. We offer both project-based and retainer models to suit different business needs."
    },
    {
        question: "Do you offer ongoing support after project completion?",
        answer: "Yes, we provide continuous support and maintenance packages to ensure your digital products remain updated, secure, and performant as your business grows."
    },
    {
        question: "How often will I receive updates on my project?",
        answer: "We maintain high transparency with weekly status updates, dedicated project management dashboards, and regular sync-up meetings to keep you informed at every step."
    }
]

export function FAQSection() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    return (
        <section id="faq" className="relative py-24 bg-transparent overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl md:text-5xl lg:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white"
                    >
                        Got questions?
                        <br />
                        We&apos;ve got <span className="italic font-serif font-normal text-zinc-700/80 dark:text-zinc-300">answers</span>
                    </motion.h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "group rounded-2xl md:rounded-3xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 overflow-hidden",
                                openIndex === index
                                    ? "bg-white dark:bg-zinc-900"
                                    : "bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900"
                            )}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                            >
                                <span className="text-lg md:text-xl font-medium text-zinc-900 dark:text-white pr-8">
                                    {faq.question}
                                </span>
                                <div className={cn(
                                    "shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-300",
                                    openIndex === index ? "rotate-90" : "rotate-0"
                                )}>
                                    {openIndex === index ? (
                                        <X className="w-5 h-5 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                                    ) : (
                                        <Plus className="w-5 h-5 text-zinc-400" strokeWidth={1.5} />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 md:px-8 pb-8 text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-4xl">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
