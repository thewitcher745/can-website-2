import React from "react";
import Head from "next/head";

import TopGainersTable from "@features/coins/TopGainersTable";
import TopLosersTable from "@features/coins/TopLosersTable";
import TrendingCoinsTable from "@features/coins/TrendingCoinsTable";
import Navbar from "@shared/ui/navbar/Navbar";
import Footer from "@shared/ui/Footer";
import TabSelector from "./TabSelector";
import MarketOverview from "@features/coins/overview/MarketOverview";

const CoinsElement = ({ activeTab }: { activeTab: string }) => {
  // This is the element to render
  var element = <TrendingCoinsTable maxRows={10} />;

  switch (activeTab) {
    case "gainers":
      element = <TopGainersTable maxRows={10} />;
      break;
    case "losers":
      element = <TopLosersTable maxRows={10} />;
      break;
    case "trending":
      element = <TrendingCoinsTable maxRows={10} />;
      break;
    case "overview":
      element = <MarketOverview />;
      break;
    default:
      element = <TopGainersTable maxRows={10} />;
      break;
  }

  return (
    <>
      <Head>
        <title>Cryptocurrencies - CAN Trading</title>
      </Head>
      <Navbar />
      <main className="px-4 w-full bg-background flex flex-col items-center min-h-screen">
        <TabSelector className="pt-24" activeTab={activeTab} />
        {element}
      </main>
      <Footer />
    </>
  );
};

export default CoinsElement;
