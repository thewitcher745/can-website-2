import { useState, useEffect } from "react";

import FearAndGreed from "../../components/technicals/FearAndGreed";
import TopCoinsTable from "../../components/homepage/gadgets/TopCoinsTable";
import RecentArticlesTable from "../../components/homepage/gadgets/RecentArticlesTable";
import OurStats from "../../components/homepage/promotions/ourStats/OurStats";
import Banner from "../../components/homepage/promotions/Banner";
import Dominance from "../../components/homepage/gadgets/Dominance";
import MostRecent from "../../components/analysis/MostRecent";

import { AnalysisPostMeta } from "../../components/analysis/MostRecentAnalysisCard";
import { buildApiUrl } from "../../config";

const Staging: React.FC = () => {
  const [posts, setPosts] = useState<AnalysisPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(buildApiUrl(`/api/analysis`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch analysis posts");
        return res.json();
      })
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  return (
    <main className="py-20 px-4 w-full bg-background flex flex-col items-center min-h-screen">
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
      <section id="most-recent" className="my-10">
        <div className="flex flex-col px-4 text-center sm:text-left items-center">
          <h1 className="text-3xl font-bold mb-2 text-primary">
            Latest analysis
          </h1>
          <p className="text-text-main text-xl">
            The latest analysis posts from our premium analysis service.
          </p>
        </div>
        <MostRecent recentAnalysis={posts.slice(0, 5)} />
      </section>
      <OurStats />
      <div className="w-full pt-20 sm:pt-0 flex justify-center">
        <Banner />
      </div>
    </main>
  );
};

export default Staging;
