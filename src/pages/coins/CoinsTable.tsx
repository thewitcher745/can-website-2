import React from "react";

import TopGainersTable from "../../components/technicals/TopGainersTable";
import TopLosersTable from "../../components/technicals/TopLosersTable";
import TrendingCoinsTable from "../../components/technicals/TrendingCoinsTable";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import TabSelector from "./TabSelector";

const CoinsTable = ({ activeTab }: { activeTab: string }) => {
  // This is the elemet to render as the table
  var tableElement = <TrendingCoinsTable />;

  switch (activeTab) {
    case "gainers":
      tableElement = <TopGainersTable maxRows={10} />;
      break;
    case "losers":
      tableElement = <TopLosersTable maxRows={10} />;
      break;
    case "trending":
      tableElement = <TrendingCoinsTable />;
      break;
    default:
      tableElement = <TopGainersTable maxRows={10} />;
      break;
  }

  return (
    <>
      <Navbar />
      <main className="px-4 w-full bg-background flex flex-col items-center">
        <TabSelector className="pt-24" activeTab={activeTab} />
        {tableElement}
      </main>
      <Footer />
    </>
  );
};

export default CoinsTable;
