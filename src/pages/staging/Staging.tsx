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
        className="max-w-7xl w-full flex flex-col md:flex-row gap-2 justify-start"
      >
        <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-2 justify-center items-center sm:items-stretch lg:justify-start">
          <RecentArticlesTable className="w-1/2" />
          <TopCoinsTable className="w-1/2" />
        </div>
        <div className="w-full md:w-1/3 h-full flex flex-col gap-2">
          <FearAndGreed className="h-1/2" />
          <FearAndGreed className="h-1/2" />
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
