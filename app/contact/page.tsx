"use client"

import * as React from "react"
import { ContactForm } from "@/components/sections/contact-form"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/layout/footer"
import { PageBackground } from "@/components/layout/page-background"

export default function ContactPage() {
    return (
        <main className="relative min-h-screen pt-20 bg-transparent">
            <PageBackground />
            <ContactForm />
            <FAQSection />
            <Footer />
        </main>
    )
}
