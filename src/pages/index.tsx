import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import ResultsSection from "../components/ResultsSection";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ResultsSection />
        <PricingSection />
        {/* Add other sections (Results, etc.) here as you modularize */}
      </main>
      <Footer />
    </>
  );
}
