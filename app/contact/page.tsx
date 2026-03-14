"use client"

import * as React from "react"
import { ContactForm } from "@/components/sections/contact-form"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/layout/footer"

export default function ContactPage() {
    return (
        <main className="relative min-h-screen pt-20 bg-transparent">
            <ContactForm />
            <FAQSection />
            <Footer />
        </main>
    )
}
