import Head from "next/head";

import ServicesSection from "@features/homepage/sections/ServicesSection";
import ResultsSection from "@features/homepage/sections/ResultsSection";
import PricingSection from "@features/homepage/sections/PricingSection";
import Footer from "@shared/ui/Footer";
import Banner from "@src/features/homepage/components/promotions/Banner";

export default function Home() {
  return (
    <>
      <Head>
        <title>VIP Trading Signals - CAN Trading</title>
        <meta
          name="description"
          content="Access exclusive VIP cryptocurrency trading signals and analysis from CAN Trading's expert team"
        />
        <meta property="og:title" content="VIP Trading Signals - CAN Trading" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Access exclusive VIP cryptocurrency trading signals and analysis from CAN Trading's expert team"
        />
        <meta property="og:url" content="https://can-trading.com/vip" />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="VIP Trading Signals - CAN Trading"
        />
        <meta
          name="twitter:description"
          content="Access exclusive VIP cryptocurrency trading signals and analysis from CAN Trading's expert team"
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      ""
      <main className="pb-16 pt-4 bg-background flex flex-col items-center">
        <ServicesSection />
        <ResultsSection />
        <PricingSection />
        <div className="px-4 w-full">
          <Banner />
        </div>
      </main>
      <Footer />
    </>
  );
}
