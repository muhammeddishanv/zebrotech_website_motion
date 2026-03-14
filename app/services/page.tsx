import { ServicesHero }    from "@/components/sections/services-hero"
import { ServicesSection }  from "@/components/sections/services-section"
import { ServicesDetail }   from "@/components/sections/services-detail"
import { ServicesProcess }  from "@/components/sections/services-process"
import { ServicesStats }    from "@/components/sections/services-stats"
import { FooterCTA }        from "@/components/sections/footer-cta"
import { Footer }           from "@/components/layout/footer"
import { Metadata }         from "next"

export const metadata: Metadata = {
    title: "Services | Zybrotech",
    description: "Explore Zybrotech's full suite of digital services — brand strategy, UI/UX design, web development, mobile apps, digital marketing, and analytics.",
}

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen">
            <ServicesHero />
            {/* <ServicesStats /> */}
            <ServicesDetail />
            <ServicesProcess />
            <ServicesSection showCTA={false} />
            <FooterCTA />
            <Footer />
        </main>
    )
}
