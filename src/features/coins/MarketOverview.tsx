import HeatmapSection from "@features/homepage/sections/HeatmapSection";
import FearAndGreed from "@shared/ui/technicals/FearAndGreed";
import HistoricalFearAndGreed from "./overview/HistoricalFearAndGreed";
import TopMarketCapChart from "./overview/TopVolumeCoinsChart/Chart";
import Stats from "./overview/TopVolumeCoinsChart/Stats";
import Dominance from "@shared/ui/technicals/Dominance";
import LongShortRatioSection from "./overview/LongShortRatio/Section";
import SmallTablesSection from "./overview/sections/SmallTablesSection";

const MarketOverview = () => {
  return (
    <>
      <SmallTablesSection />
      <section
        id="global-market-data"
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
            <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-6">
              <div className="w-full flex flex-col">
                <div className="w-full flex justify-center lg:justify-start text-text-main text-xl font-semibold lg:pl-6">
                  <span>Fear and greed</span>
                </div>
                <FearAndGreed sizingClasses="w-full xs:w-3/5 sm:w-full" />
              </div>
              <div className="w-full flex flex-col">
                <div className="w-full flex justify-center lg:justify-start text-text-main text-xl font-semibold lg:pl-6">
                  <span>Market Dominance</span>
                </div>
                <Dominance />
              </div>
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
      <LongShortRatioSection />
      <HeatmapSection />
      <HistoricalFearAndGreed />
    </>
  );
};

export default MarketOverview;
