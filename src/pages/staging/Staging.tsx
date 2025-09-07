import FearAndGreed from "../../components/technicals/FearAndGreed";
import TopGainersTable from "../../components/technicals/TopGainersTable";
import TrendingCoinsTable from "../../components/technicals/TrendingCoinsTable";
import TopLosersTable from "../../components/technicals/TopLosersTable";
import CryptoHeatmap from "../../components/technicals/CryptoHeatmap";
import TopCoinsTable from "../../components/homepage/gadgets/TopCoinsTable";
import RecentArticlesTable from "../../components/homepage/gadgets/RecentArticlesTable";

const Staging: React.FC = () => {
  return (
    <main className="py-20 px-4 w-full bg-background flex justify-center">
      <section
        id="top-row"
        className="max-w-7xl w-full flex flex-col lg:flex-row gap-2 justify-start items-center"
      >
        <div className="w-full lg:w-4/5 grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-2 ">
          <RecentArticlesTable className="w-full" />
          <TopCoinsTable className="w-full" />
        </div>
        <div className="w-full lg:w-1/5 h-full grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 lg:grid-cols-1 lg:grid-rows-2 gap-2">
          <FearAndGreed className="h-1/2 w-1/2 lg:w-full" />
          {/* <FearAndGreed className="h-1/2 w-1/2 lg:w-full" /> */}
        </div>
      </section>

      {/* <TopGainersTable />
      <TopLosersTable />
      <TrendingCoinsTable />
      <CryptoHeatmap /> */}
    </main>
  );
};

export default Staging;
