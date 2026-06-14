import ServicesSection from "@features/homepage/sections/ServicesSection";
import ResultsSection from "@features/homepage/sections/ResultsSection";
import PricingSection from "@features/homepage/sections/PricingSection";
import Footer from "@shared/ui/Footer";
import Banner from "@src/features/homepage/components/promotions/Banner";
import MetaTags from "@src/shared/MetaTags";

export default function Home() {
  return (
    <>
      <MetaTags
        title="CAN Services"
        description="Access exclusive cryptocurrency trading setups and analysis from CAN Trading's expert team"
        canonicalUrl="https://can-trading.com/services"
        image="/images/showcase/can-banner.png"
        type="website"
      />
      <main className="pb-16 pt-4 bg-background flex flex-col items-center">
        <ServicesSection />
        <ResultsSection />
        <PricingSection />
        <div className="px-4 w-full flex justify-center">
          <Banner />
        </div>
      </main>
      <Footer />
    </>
  );
}
