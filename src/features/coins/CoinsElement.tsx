import React from "react";
import Head from "next/head";

import TopGainersTable from "@src/features/coins/TopGainersLosers";
import TrendingCoinsTable from "@features/coins/TrendingCoinsTable";
import Navbar from "@shared/ui/navbar/Navbar";
import Footer from "@shared/ui/Footer";
import TabSelector from "./TabSelector";
import MarketOverview from "@src/features/coins/MarketOverview";
import TopGainersLosers from "@src/features/coins/TopGainersLosers";

const CoinsElement = ({ activeTab }: { activeTab: string }) => {
  // This is the element to render
  var element = <TrendingCoinsTable maxRows={10} />;

  switch (activeTab) {
    case "gainers_losers":
      element = <TopGainersLosers />;
      break;
    case "gainers_losers":
      element = <TopGainersTable />;
      break;
    case "trending":
      element = <TrendingCoinsTable maxRows={10} />;
      break;
    case "overview":
      element = <MarketOverview />;
      break;
    default:
      element = <MarketOverview />;
      break;
  }

  return (
    <>
      <Head>
        <title>Cryptocurrencies - CAN Trading</title>
      </Head>
      <main className="px-4 w-full bg-background flex flex-col items-center min-h-screen">
        <section className="pt-4 w-full justify-center flex flex-col items-center">
          <TabSelector activeTab={activeTab} />
          {element}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CoinsElement;
