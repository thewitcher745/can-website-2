import React from "react";

import TopGainersTable from "../../components/technicals/TopGainersTable";
import TopLosersTable from "../../components/technicals/TopLosersTable";
import TrendingCoinsTable from "../../components/technicals/TrendingCoinsTable";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import TabSelector from "./TabSelector";
import MarketOverview from "../../components/technicals/MarketOverview/MarketOverview";

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
