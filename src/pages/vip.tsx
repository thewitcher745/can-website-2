import Head from "next/head";
import Link from "next/link";
import { FaTelegram } from "react-icons/fa6";

import Navbar from "@shared/ui/navbar/Navbar";
import ServicesSection from "@features/homepage/sections/ServicesSection";
import ResultsSection from "@features/homepage/sections/ResultsSection";
import PricingSection from "@features/homepage/sections/PricingSection";
import Footer from "@shared/ui/Footer";

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
      <main>
        <ServicesSection />
        <ResultsSection />
        <PricingSection />
        <div className="mt-12 flex flex-wrap justify-center w-full text-xl text-text-main">
          <Link
            href="/telegram"
            className="text-nowrap flex gap-1 items-center mr-1 title-hover "
          >
            <span>Join our</span>
            <FaTelegram />
            <span className="underline"> Telegram channel</span>
          </Link>
          <span> for more free analysis!</span>
        </div>
      </main>
      <Footer />
    </>
  );
}
