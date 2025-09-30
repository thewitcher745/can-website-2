import { ChevronRight } from "lucide-react";
import Link from "next/link";

import FearAndGreed from "@shared/ui/technicals/FearAndGreed";
import Dominance from "@shared/ui/technicals/Dominance";
import TopCoinsTable from "../components/articles-and-coins/TopCoinsTable";
import RecentArticlesTable from "../components/articles-and-coins/RecentArticlesTable";

const TopRowGadgetsSection: React.FC = () => {
  return (
    <section id="top-row" className="w-full flex justify-center my-2">
      <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl w-full flex flex-col lg:flex-row gap-2 justify-center items-center">
        <div className="w-full xl:w-3/4 lg:w-2/3 grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-2">
          <RecentArticlesTable className="w-full" />
          <TopCoinsTable className="w-full" />
        </div>
        <div className="w-full h-90 sm:h-45 lg:h-90 xl:w-1/4 lg:w-1/3 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 lg:grid-cols-1 lg:grid-rows-2 gap-2">
          <div className="flex p-3 pb-0 justify-between flex-col items-center mb-1">
            <Link
              href="/coins/overview"
              className="flex items-center justify-center w-full"
            >
              <h3 className="text-lg font-bold underline text-text-main title-hover">
                Fear and Greed
              </h3>
              <ChevronRight className="h-8 w-8 text-text-muted self-end" />
            </Link>
            <FearAndGreed sizingClasses="w-full xs:w-3/5 sm:w-full" />
          </div>
          <div className="flex p-3 pt-0 justify-between flex-col items-center mb-1">
            <Link
              href="/coins/overview"
              className="flex items-center justify-center w-full"
            >
              <h3 className="text-lg font-bold underline text-text-main title-hover">
                Market Dominance
              </h3>
              <ChevronRight className="h-8 w-8 text-text-muted self-end" />
            </Link>
            <Dominance />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRowGadgetsSection;
