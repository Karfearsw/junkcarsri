import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";
import QuoteCalculator from "@/components/QuoteCalculator";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ServiceAreas from "@/components/ServiceAreas";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <StickyHeader />
      <main className="pt-16 lg:pt-20">
        <HeroSection />
        <TrustSignals />
        <QuoteCalculator />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <ServiceAreas />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
