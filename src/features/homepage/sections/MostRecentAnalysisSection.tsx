import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBookOpen } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

import { AnalysisPostMeta } from "@src/types";
import { buildApiUrl } from "@src/config";
import MostRecent from "../components/most-recent-analysis/MostRecent";

const MostRecentAnalysisSection = () => {
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

  // Change number of posts based on screen size
  const mostRecentElement = (
    <div>
      <div className="items-center gap-4 w-full 2xl:block hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 12)} />
      </div>
      <div className="items-center gap-4 w-full md:max-2xl:block hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 9)} />
      </div>
      <div className="items-center gap-4 w-full sm:max-md:flex hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 6)} />
      </div>
      <div className="items-center gap-4 w-full max-sm:flex hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 3)} />
      </div>
    </div>
  );

  return (
    <section id="most-recent" className="w-full flex justify-center my-2">
      <div className="max-w-custom py-4 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col self-start px-4 sm:text-left">
          <Link
            href="/analysis"
            className="text-2xl font-bold mb-2 text-text-main transition-colors duration-200 flex items-center"
          >
            <h2 className="title-hover underline">Latest analysis</h2>
            <ChevronRight className="h-8 w-8 text-text-muted" />
          </Link>
        </div>
        {mostRecentElement}
        <div className="flex gap-2 items-center justify-center hover:*:text-primary">
          <FaBookOpen className="w-6 h-6 text-text-main transition-all duration-200" />
          <Link
            href="/analysis"
            className="text-text-main font-bold transition-all duration-200"
          >
            Show more
          </Link>
          <ChevronRight className="w-6 h-6 text-text-main transition-all duration-200" />
        </div>
      </div>
    </section>
  );
};

export default MostRecentAnalysisSection;
