import TopMarketCapChart from "./Chart";
import FearAndGreed from "./FearAndGreed";
import Dominance from "./Dominance";
import Stats from "./Stats";

const GlobalMarketData = () => {
  return (
    <>
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
    </>
  );
};

export default GlobalMarketData;
