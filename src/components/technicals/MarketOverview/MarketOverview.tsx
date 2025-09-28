import HeatmapSection from "../../HeatmapSection";
import FearAndGreed from "../FearAndGreed";
import HistoricalFearAndGreed from "./HistoricalFearAndGreed";
import SmallTables from "./SmallTables";
import TopMarketCapChart from "./TopVolumeCoinsChart/Chart";
import Stats from "./TopVolumeCoinsChart/Stats";
import Dominance from "../../homepage/gadgets/Dominance";

const MarketOverview = () => {
  return (
    <>
      <SmallTables />
      <section
        id="top-market-cap-chart"
        className="w-full flex justify-center pt-8"
      >
        <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex flex-col lg:flex-row justify-center">
          <div className="relative w-full xl:w-2/3">
            <div className="w-full flex justify-center lg:justify-start text-text-main text-xl font-semibold">
              <span>Top Cryptocurrencies</span>
            </div>
            <TopMarketCapChart />
          </div>
          <div className="w-full xl:w-1/3 flex flex-col gap-2 lg:border-l border-text-muted/50 lg:ml-6">
            <div className="w-full flex justify-center lg:justify-start text-text-main text-xl font-semibold lg:pl-6">
              <span>Fear and greed</span>
            </div>
            <div className="w-full h-1/4">
              <FearAndGreed />
            </div>
            <div className="w-full flex justify-center lg:justify-start text-text-main text-xl font-semibold lg:pl-6">
              <span>Market Dominance</span>
            </div>
            <div className="w-full h-1/4">
              <Dominance />
            </div>
            <div className="w-full flex justify-center lg:justify-start text-text-main text-xl font-semibold lg:pl-6">
              <span>Global market data</span>
            </div>
            <div className="w-auto lg:w-full flex justify-center lg:pl-6">
              <Stats />
            </div>
          </div>
        </div>
      </section>
      <HeatmapSection />
      <HistoricalFearAndGreed />
    </>
  );
};

export default MarketOverview;
