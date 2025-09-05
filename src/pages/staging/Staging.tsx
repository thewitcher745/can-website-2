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
      <section id="top-row" className="max-w-7xl w-full">
        <div className="w-full flex flex-wrap gap-2 justify-center lg:justify-start">
          <RecentArticlesTable />
          <TopCoinsTable />
        </div>
      </section>
      {/* <FearAndGreed />
      <TopGainersTable />
      <TopLosersTable />
      <TrendingCoinsTable />
      <CryptoHeatmap /> */}
    </main>
  );
};

export default Staging;
