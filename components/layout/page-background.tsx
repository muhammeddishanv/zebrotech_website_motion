"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function PageBackground() {
    const { scrollY } = useScroll()
    
    // Fade out backgrounds and orbs as we scroll down (roughly past the hero section)
    const backgroundOpacity = useTransform(scrollY, [0, 600], [1, 0])
    const darkBackgroundOpacity = useTransform(scrollY, [0, 600], [1, 0.4])

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden transform-gpu bg-white dark:bg-zinc-950">
            {/* ── LIGHT MODE background ── */}
            <motion.div 
                style={{ opacity: backgroundOpacity }}
                className="absolute inset-0 dark:hidden transform-gpu will-change-opacity"
            >
                <div className="w-full h-full"
                    style={{
                        background: `
                            radial-gradient(circle at 10% 20%, rgba(186,230,253,0.55) 0%, transparent 45%),
                            radial-gradient(circle at 85% 15%, rgba(254,249,195,0.55) 0%, transparent 45%),
                            radial-gradient(circle at 80% 80%, rgba(187,247,208,0.4) 0%, transparent 45%),
                            radial-gradient(circle at 10% 85%, rgba(254,215,226,0.4) 0%, transparent 45%)
                        `
                    }}
                />
            </motion.div>

            {/* ── DARK MODE background ── */}
            <motion.div 
                style={{ opacity: darkBackgroundOpacity }}
                className="absolute inset-0 hidden dark:block transform-gpu will-change-opacity"
            >
                <div className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 60%),
                            radial-gradient(ellipse at 60% 80%, rgba(16,185,129,0.05) 0%, transparent 60%)
                        `
                    }}
                />
            </motion.div>

            {/* ── Animated floating orbs (light mode) ── */}
            <motion.div 
                style={{ opacity: useTransform(scrollY, [0, 400], [0.4, 0]) }}
                className="absolute inset-0 dark:hidden transition-opacity duration-1000 transform-gpu"
            >
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.5, 0.35] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.45, 0.3] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-[100px]"
                />
            </motion.div>


            
            <motion.div 
                style={{ opacity: useTransform(scrollY, [0, 700], [1, 0]) }}
                className="absolute top-[60vh] left-1/2 -translate-x-1/2 w-[120vw] h-[40vh] bg-linear-to-b from-transparent via-white/40 dark:via-zinc-900/40 to-transparent blur-[120px]" 
            />
        </div>
    )
}
