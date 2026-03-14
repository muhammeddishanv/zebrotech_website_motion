"use client"

import * as React from "react"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { Footer } from "@/components/layout/footer"
import { FooterCTA } from "@/components/sections/footer-cta"

export default function PortfolioPage() {
    return (
        <main className="relative min-h-screen pt-20 bg-transparent">
            <PortfolioSection />
            <FooterCTA />
            <Footer />
        </main>
    )
}
