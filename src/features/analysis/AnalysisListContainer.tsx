import { useState, useEffect } from "react";

import AnalysisCard from "./AnalysisCard";
import { ListedAnalysis } from "@src/domains/analysis/types";

type TabType = "all" | "vip";

const AnalysisListContainer = ({ posts }: { posts: ListedAnalysis[] }) => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [nPostsToShow, setNPostsToShow] = useState(12);

  // Persist to localStorage whenever values change
  useEffect(() => {
    try {
      localStorage.setItem("analysis.activeTab", activeTab);
      localStorage.setItem("analysis.nPostsToShow", String(nPostsToShow));
    } catch {
      // ignore storage errors
    }
  }, [activeTab, nPostsToShow]);

  const addMorePosts = () => {
    setNPostsToShow((prev) => prev + 12);
  };

  const nonVipPosts = posts.filter((post) => !post.meta.isVip);
  const vipPosts = posts.filter((post) => post.meta.isVip);

  const postsToShow = activeTab == "vip" ? vipPosts : nonVipPosts;

  return (
    <div className="max-w-[100rem] w-full mx-auto pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <h2
            onClick={() => setActiveTab("all")}
            className={`py-2 font-bold text-xl md:text-3xl cursor-pointer ${
              activeTab === "all"
                ? "text-primary underline"
                : "text-primary/40 hover:text-primary/80"
            }`}
          >
            📝 All Analysis
          </h2>
          <h2 className="text-3xl text-primary">/</h2>
          <h2
            onClick={() => setActiveTab("vip")}
            className={`py-2 font-bold text-xl md:text-3xl cursor-pointer ${
              activeTab === "vip"
                ? "text-primary underline"
                : "text-primary/40 hover:text-primary/80"
            }`}
          >
            🔥VIP Analysis
          </h2>
        </div>
      </div>

      {activeTab !== "vip" && (
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
        {postsToShow.slice(0, nPostsToShow).map((post) => (
          <AnalysisCard
            key={post.slug}
            post={post}
            isVip={activeTab === "vip"}
          />
        ))}
      </div>
      {postsToShow.length > nPostsToShow && (
        <div className="flex justify-center mt-4">
          <button
            onClick={addMorePosts}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-lg font-semibold text-text-main transition hover:bg-white/10 hover:text-primary"
          >
            <span className="text-xl">Load More</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisListContainer;
