import TopMarketCapChart from "./Chart";
import FearAndGreed from "./FearAndGreed";
import Dominance from "./Dominance";
import Stats from "./Stats";
import Title from "../Title";

const GlobalMarketData = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="relative w-full xl:w-2/3">
        <Title sub={true} title="Top Cryptocurrencies" />
        <TopMarketCapChart />
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-2 lg:border-l border-text-muted/50 lg:ml-6">
        <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-6">
          <div className="w-full flex flex-col">
            <Title sub={true} title="Fear and greed" center={true} />
            <FearAndGreed sizingClasses="w-full xs:w-3/5 sm:w-full" />
          </div>
          <div className="w-full flex flex-col">
            <Title sub={true} title="Market Dominance" center={true} />
            <Dominance />
          </div>
        </div>
        <Title sub={true} title="Global market data" center={true} />
        <div className="w-auto lg:w-full flex justify-center lg:pl-4">
          <Stats />
        </div>
      </div>
    </div>
  );
};

export default GlobalMarketData;
