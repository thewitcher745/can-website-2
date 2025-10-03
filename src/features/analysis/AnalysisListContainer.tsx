import { useState, useEffect } from "react";

import AnalysisCard from "./AnalysisCard";
import { AnalysisPostMeta } from "@src/types";
import { buildApiUrl } from "@src/config";

type TabType = "all" | "vip";

const AnalysisListContainer = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<AnalysisPostMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVipPosts = async () => {
      if (activeTab === "vip") {
        setLoading(true);
        setError(null);
        fetch(buildApiUrl(`/api/vip_analysis`))
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch analysis posts");
            return res.json();
          })
          .then(setPosts)
          .catch((e) => setError(e.message))
          .finally(() => setLoading(false));
      } else if (activeTab == "all") {
        setLoading(true);
        setError(null);
        fetch(buildApiUrl(`/api/analysis`))
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch analysis posts");
            return res.json();
          })
          .then(setPosts)
          .catch((e) => setError(e.message))
          .finally(() => setLoading(false));
      }
    };

    fetchVipPosts();
  }, [activeTab]);

  const noPostsMessage =
    activeTab === "vip" ? "No VIP posts found." : "No posts found.";

  return (
    <div className="max-w-[100rem] w-full mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 font-bold text-xl md:text-3xl ${
              activeTab === "all"
                ? "text-primary underline"
                : "text-primary/40 hover:text-primary/80"
            }`}
          >
            📝 All Analysis
          </button>
          <h2 className="text-3xl text-primary">/</h2>
          <button
            onClick={() => setActiveTab("vip")}
            className={`py-2 font-bold text-xl md:text-3xl ${
              activeTab === "vip"
                ? "text-primary underline"
                : "text-primary/40 hover:text-primary/80"
            }`}
          >
            🔥VIP Analysis
          </button>
        </div>
      </div>

      {activeTab === "all" && (
        <p className="text-text-main text-xl mb-6">
          You can find our reliable, accurate and profitable premium analysis
          for different coins here.
        </p>
      )}
      {activeTab === "vip" && (
        <p className="text-text-main text-xl mb-6">
          Exclusive VIP analysis with in-depth market insights and premium
          trading strategies.
        </p>
      )}

      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {loading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-pulse text-text-muted">Loading...</div>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-8 text-red-500">
            {error}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-text-muted col-span-full py-8">
            {noPostsMessage}
          </div>
        ) : (
          posts.map((post) => <AnalysisCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
};

export default AnalysisListContainer;
