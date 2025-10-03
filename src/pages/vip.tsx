import Head from "next/head";

import Navbar from "@shared/ui/navbar/Navbar";
import HeroSection from "@features/homepage/sections/HeroSection";
import ServicesSection from "@features/homepage/sections/ServicesSection";
import ResultsSection from "@features/homepage/sections/ResultsSection";
import PricingSection from "@features/homepage/sections/PricingSection";
import Footer from "@shared/ui/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>CAN Trading - Home</title>
      </Head>
      <Navbar />
      <main>
        <ServicesSection />
        <ResultsSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
