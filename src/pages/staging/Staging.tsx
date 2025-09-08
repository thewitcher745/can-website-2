import FearAndGreed from "../../components/technicals/FearAndGreed";
import TopCoinsTable from "../../components/homepage/gadgets/TopCoinsTable";
import RecentArticlesTable from "../../components/homepage/gadgets/RecentArticlesTable";
import OurStats from "../../components/homepage/promotions/ourStats/OurStats";
import Banner from "../../components/homepage/promotions/Banner";

const Staging: React.FC = () => {
  return (
    <main className="py-20 px-4 w-full bg-background flex flex-col items-center">
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
      <OurStats />
      <div className="w-full pt-20 sm:pt-0 flex justify-center">
        <Banner />
      </div>
    </main>
  );
};

export default Staging;
