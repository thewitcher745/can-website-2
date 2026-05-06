import { useState, useEffect } from "react";

import AnalysisCard from "./AnalysisCard";
import { ListedAnalysisPost } from "@src/types";
import { buildApiUrl } from "@src/config";
import { FaPlus } from "react-icons/fa6";

type TabType = "all" | "vip";

const AnalysisListContainer = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [nPostsToShow, setNPostsToShow] = useState(12);
  const [posts, setPosts] = useState<ListedAnalysisPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1) Load from localStorage on first mount (client-only)
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem("analysis.activeTab");
      if (savedTab === "all" || savedTab === "vip") {
        setActiveTab(savedTab as TabType);
      }

      const savedN = localStorage.getItem("analysis.nPostsToShow");
      const parsedN = savedN ? parseInt(savedN, 10) : NaN;
      if (!Number.isNaN(parsedN) && parsedN > 0) {
        setNPostsToShow(parsedN);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // 2) Persist to localStorage whenever values change
  useEffect(() => {
    try {
      localStorage.setItem("analysis.activeTab", activeTab);
      localStorage.setItem("analysis.nPostsToShow", String(nPostsToShow));
    } catch {
      // ignore storage errors
    }
  }, [activeTab, nPostsToShow]);

  useEffect(() => {
    if (activeTab === "vip") {
      setLoading(true);
      setError(null);
      fetch(buildApiUrl(`/api/vip_analysis`))
        .then((res) => {
          if (!res.ok) throw new Error("Oops! Something went wrong.");
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
          if (!res.ok) throw new Error("Oops! Something went wrong.");
          return res.json();
        })
        .then(setPosts)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  const addMorePosts = () => {
    setNPostsToShow((prev) => prev + 12);
  };

  const noPostsMessage =
    activeTab === "vip" ? "No VIP posts found." : "No posts found.";

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
          posts
            .slice(0, nPostsToShow)
            .map((post) => (
              <AnalysisCard
                key={post.slug}
                post={post}
                isVip={activeTab === "vip"}
              />
            ))
        )}
      </div>
      {posts.length > nPostsToShow && (
        <div className="flex justify-center mt-4">
          <button
            onClick={addMorePosts}
            className="flex gap-2 h-16 cursor-pointer items-center text-text-muted px-6 py-3 font-semibold hover:text-primary transition shadow-sm"
          >
            <FaPlus className="w-6 h-6" />
            <span className="text-2xl">Load More</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisListContainer;
