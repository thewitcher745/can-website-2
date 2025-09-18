import Link from "next/link";
import { useState, useEffect } from "react";

import { AnalysisPostMeta } from "./analysis/MostRecentAnalysisCard";
import { buildApiUrl } from "../config";
import MostRecent from "./analysis/MostRecent";

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

  return (
    <section id="most-recent" className="my-10">
      <div className="flex flex-col px-4 text-center sm:text-left items-center">
        <Link
          href="/analysis"
          className="text-3xl font-bold mb-2 underline text-primary hover:text-primary-light transition-colors duration-200"
        >
          Latest analysis
        </Link>
        <p className="text-text-main text-xl">
          The latest analysis posts from our premium analysis service.
        </p>
      </div>
      <MostRecent recentAnalysis={posts.slice(0, 5)} />
      <div className="flex justify-center">
        <span className="text-text-main">
          To see all analysis posts, you can navigate to the{" "}
          <Link href="/analysis" className="text-primary">
            Analysis
          </Link>{" "}
          page.
        </span>
      </div>
    </section>
  );
};

export default MostRecentAnalysisSection;
