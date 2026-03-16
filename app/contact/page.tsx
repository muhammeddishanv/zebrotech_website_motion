"use client"

import * as React from "react"
import { ContactForm } from "@/components/sections/contact-form"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/layout/footer"

export default function ContactPage() {
    return (
        <main className="relative min-h-screen pt-20 bg-transparent">
            <React.Suspense fallback={<div className="min-h-screen animate-pulse bg-zinc-50 dark:bg-zinc-950" />}>
                <ContactForm />
            </React.Suspense>
            <FAQSection />
            <Footer />
        </main>
    )
}
