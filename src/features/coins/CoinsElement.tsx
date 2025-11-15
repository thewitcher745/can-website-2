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
        <meta
          name="description"
          content={`View the latest cryptocurrency data. Track price movements, market caps, and trading volumes.`}
        />
        <meta property="og:title" content={`Cryptocurrencies - CAN Trading`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`View the latest cryptocurrency data. Track price movements, market caps, and trading volumes.`}
        />
        <meta
          property="og:url"
          content={`https://can-trading.com/coins/${activeTab}`}
        />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Cryptocurrencies - CAN Trading`} />
        <meta
          name="twitter:description"
          content={`View the latest cryptocurrency data. Track price movements, market caps, and trading volumes.`}
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
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
