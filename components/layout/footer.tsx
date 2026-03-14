"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Dribbble, Instagram, ArrowUp, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
    sitemap: [
        { name: "Home", href: "/" },
        { name: "About us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Contact", href: "/contact" },
    ],
    otherPages: [
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
    ],
    contact: {
        address: "Padipura Trade Centre,Bypass Jn,Calicut Road, Perinthalmana, 679322",
        email: "info@zybrotech.in",
        phones: ["+91 9497 8395 94", "+91 9745 0013 66"]
    }
}

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
    }

    return (
        <footer id="contact" className="relative bg-transparent pt-24 pb-12 overflow-hidden border-t border-zinc-100 dark:border-zinc-900">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-24"
                >

                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 space-y-10">
                        <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95">
                            <Image
                                src="/zybrotech-logo.webp"
                                alt="Zybrotech Logo"
                                width={180}
                                height={50}
                                className="h-12 w-auto object-contain dark:brightness-0 dark:invert"
                            />
                        </Link>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-sm font-medium">
                            Empowering businesses with robust digital architectures. Let&apos;s engineer your next breakthrough together.
                        </p>
                    </motion.div>

                    {/* Sitemap */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 lg:ml-auto">
                        <h4 className="text-zinc-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-8">Useful Links</h4>
                        <ul className="space-y-5">
                            {footerLinks.sitemap.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-block font-medium">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Other Pages */}
                    <motion.div variants={itemVariants} className="lg:col-span-3 lg:pl-12">
                        <h4 className="text-zinc-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-8">Other Pages</h4>
                        <ul className="space-y-5">
                            {footerLinks.otherPages.map((link) => (
                                <li key={link.name}>
                                    <span className="text-zinc-500 dark:text-zinc-400 inline-block font-medium cursor-default">
                                        {link.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Details */}
                    <motion.div variants={itemVariants} className="lg:col-span-3">
                        <h4 className="text-zinc-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-8">Contact Us</h4>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <a
                                    href={`mailto:${footerLinks.contact.email}`}
                                    className="text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium break-all"
                                >
                                    {footerLinks.contact.email}
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="space-y-2">
                                    {footerLinks.contact.phones.map((phone) => (
                                        <a
                                            key={phone}
                                            href={`tel:${phone.replace(/\s/g, "")}`}
                                            className="block text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                                        >
                                            {phone}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                                    {footerLinks.contact.address}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-zinc-200 dark:border-zinc-900 relative">
                    <div className="text-center">
                        <p className="text-zinc-400 dark:text-zinc-500 text-sm font-medium">
                            ©{new Date().getFullYear()} Zybrotech. All Rights Reserved
                        </p>
                    </div>

                    {/* Scroll to Top */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 md:top-auto md:bottom-2 md:translate-y-0">
                        <button
                            onClick={scrollToTop}
                            className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all hover:scale-110 active:scale-95 shadow-xl shadow-indigo-500/20 active:translate-y-1"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="w-5 h-5" strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
