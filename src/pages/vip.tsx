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
        <title>CAN Trading - Home</title>
      </Head>
      ""
      <main>
        <ServicesSection />
        <ResultsSection />
        <PricingSection />
        <div className="mt-12 flex flex-wrap justify-center w-full text-xl text-text-main">
          <Link
            href="/vip"
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
