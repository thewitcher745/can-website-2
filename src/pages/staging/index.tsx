import Head from "next/head";

import Navbar from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import Footer from "../../components/Footer";
import FearAndGreed from "../../components/technicals/FearAndGreed";
import TopGainersTable from "../../components/technicals/TopGainersTable";
import TrendingCoinsTable from "../../components/technicals/TrendingCoinsTable";
import TopLosersTable from "../../components/technicals/TopLosersTable";
import Treemap from "../../components/technicals/Treemap";

export default function Home() {
  return (
    <>
      <Head>
        <title>CAN Trading - Home</title>
      </Head>
      <Navbar />
      <main>
        <HeroSection />
        <FearAndGreed />
        <TopGainersTable />
        <TopLosersTable />
        <TrendingCoinsTable />
        <Treemap />
      </main>
      <Footer />
    </>
  );
}
