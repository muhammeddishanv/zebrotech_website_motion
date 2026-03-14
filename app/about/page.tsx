import { AboutHero } from "@/components/sections/about-hero"
import { PhilosophySection } from "@/components/sections/philosophy-section"
import { ImpactSection } from "@/components/sections/impact-section"
import { TeamSection } from "@/components/sections/team-section"
import { FooterCTA } from "@/components/sections/footer-cta"
import { Footer } from "@/components/layout/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "About Us | Zybrotech",
    description: "Learn more about Zybrotech, our mission, vision, and the team driving digital innovation.",
}

export default function AboutPage() {
    return (
        <main className="relative min-h-screen">
            <AboutHero />
            <PhilosophySection />
            <ImpactSection showLink={false}>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    Our commitment to excellence drives us to push boundaries and redefine digital experiences. 
                    We believe that every interaction is an opportunity to create something extraordinary.
                </p>
            </ImpactSection>
            <TeamSection />
            <FooterCTA />
            <Footer />
        </main>
    )
}
