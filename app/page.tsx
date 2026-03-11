import { HeroSection } from "@/components/hero/hero-section"
import { LogoShowcase } from "@/components/sections/logo-showcase"
import { ImpactSection } from "@/components/sections/impact-section"
import { ServicesSection } from "@/components/sections/services-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { TeamSection } from "@/components/sections/team-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FooterCTA } from "@/components/sections/footer-cta"
import { Footer } from "@/components/layout/footer"
import { PageBackground } from "@/components/layout/page-background"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <PageBackground />
      <HeroSection />
      <LogoShowcase />
      <ImpactSection />
      <ServicesSection />
      <PortfolioSection />
      <TeamSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterCTA />
      <Footer />
    </main>
  )
}
