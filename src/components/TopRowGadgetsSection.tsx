import FearAndGreed from "./technicals/FearAndGreed";
import TopCoinsTable from "./homepage/gadgets/TopCoinsTable";
import RecentArticlesTable from "./homepage/gadgets/RecentArticlesTable";
import Dominance from "./homepage/gadgets/Dominance";

const TopRowGadgetsSection: React.FC = () => {
  return (
    <section
      id="top-row"
      className="max-w-7xl w-full flex flex-col lg:flex-row gap-2 justify-start items-center"
    >
      <div className="w-full xl:w-3/4 lg:w-2/3 grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-2 ">
        <RecentArticlesTable className="w-full" />
        <TopCoinsTable className="w-full" />
      </div>
      <div className="w-full h-90 sm:h-45 lg:h-90 xl:w-1/4 lg:w-1/3 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 lg:grid-cols-1 lg:grid-rows-2 gap-2">
        <FearAndGreed />
        <Dominance />
      </div>
    </section>
  );
};

export default TopRowGadgetsSection;
