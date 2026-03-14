"use client"

import * as React from "react"
import Image from "next/image"

// ── Logo config ───────────────────────────────────────────────────────────────
const LOGO_SRC = "/typephase estadio.webp"
const LOGO_ALT = "Typephase Estadio"
const LOGO_COUNT = 8

const logos = Array.from({ length: LOGO_COUNT }, (_, i) => ({
    id: i,
    src: LOGO_SRC,
    alt: LOGO_ALT,
}))

// ── Component ─────────────────────────────────────────────────────────────────
export function LogoShowcase() {
    return (
        <section className="relative py-6 md:py-20 overflow-hidden">
            {/* Inject keyframes directly — immune to Tailwind purging */}
            <style>{`
                @keyframes carousel-scroll {
                    from { transform: translate3d(0, 0, 0); }
                    to { transform: translate3d(-50%, 0, 0); }
                }
            `}</style>

            <div className="container mx-auto px-6">

                {/* Divider header */}
                <div className="flex items-center justify-center gap-6 mb-2">
                    <div className="h-[3px] flex-1 max-w-[200px] bg-linear-to-r from-transparent to-zinc-300 dark:to-zinc-500" />
                    <span className="text-[11px] md:text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center whitespace-nowrap tracking-wide">
                        Loved by big and small brands around the world
                    </span>
                    <div className="h-[3px] flex-1 max-w-[200px] bg-linear-to-l from-transparent to-zinc-300 dark:to-zinc-500" />
                </div>

                {/*
                 * Carousel track
                 * Edge masks fade the logos out at the left/right edges
                 */}
                <div
                    className="relative w-full overflow-hidden select-none"
                >
                    {/*
                     * Pure CSS @keyframes animation (runs on compositor thread).
                     * The track contains 2 identical sets of logos.
                     * translateX(0) → translateX(-50%) loops seamlessly.
                     */}
                    <div
                        className="flex items-center w-max py-2"
                        style={{
                            gap: "clamp(3.5rem, 7vw, 8rem)",
                            animation: "carousel-scroll 35s linear infinite",
                            willChange: "transform",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        {[...logos, ...logos].map((logo, idx) => (
                            <div
                                key={`logo-${idx}`}
                                className="shrink-0 flex items-center justify-center"
                            >

                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={220}
                                    height={68}
                                    className="carousel-logo"
                                    style={{
                                        height: "clamp(4rem, 8vw, 4.5rem)",
                                        width: "auto",
                                        objectFit: "contain",
                                    }}
                                    draggable={false}
                                    priority={idx < LOGO_COUNT}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
