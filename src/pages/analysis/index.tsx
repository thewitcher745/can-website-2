import Head from "next/head";
import React, { useEffect, useState } from "react";

import Navbar from "@shared/ui/navbar/Navbar";
import Footer from "@src/shared/ui/Footer";
import { buildApiUrl } from "@src/config";
import { AnalysisPostMeta } from "@src/types";
import MostRecent from "@features/homepage/components/most-recent-analysis/MostRecent";
import AnalysisListContainer from "@features/analysis/AnalysisListContainer";
import BannerMini from "@src/features/homepage/components/promotions/BannerMini";

const Analysis: React.FC = () => {
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

  const filteredPosts = posts;

  if (loading)
    return (
      <>
        <Head>
          <title>Technical Analysis - CAN Trading</title>
          <meta
            name="description"
            content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
          />
          <meta
            property="og:title"
            content="Technical Analysis - CAN Trading"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
          />
          <meta property="og:url" content="https://can-trading.com/analysis" />
          <meta property="og:site_name" content="CAN Trading" />
          <meta property="og:image" content="/images/showcase/can-banner.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Technical Analysis - CAN Trading"
          />
          <meta
            name="twitter:description"
            content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
          />
          <meta
            name="twitter:image"
            content="/images/showcase/can-banner.png"
          />
        </Head>
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-opacity-60 mb-4"></div>
            <span className="text-text-muted text-lg tracking-wide">
              Loading...
            </span>
          </div>
        </main>
        <Footer />
      </>
    );

  if (error)
    return (
      <>
        <Head>
          <title>Technical Analysis - CAN Trading</title>
          <meta
            name="description"
            content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
          />
          <meta
            property="og:title"
            content="Technical Analysis - CAN Trading"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
          />
          <meta property="og:url" content="https://can-trading.com/analysis" />
          <meta property="og:site_name" content="CAN Trading" />
          <meta property="og:image" content="/images/showcase/can-banner.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Technical Analysis - CAN Trading"
          />
          <meta
            name="twitter:description"
            content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
          />
          <meta
            name="twitter:image"
            content="/images/showcase/can-banner.png"
          />
        </Head>
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-error animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-error text-lg tracking-wide font-semibold mb-2">
              Error
            </span>
            <span className="text-text-muted text-base">{error}</span>
          </div>
        </main>
        <Footer />
      </>
    );

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
      <div className="items-center gap-4 w-full xs:max-sm:flex hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 5)} />
      </div>
      <div className="items-center gap-4 w-full max-xs:flex hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 3)} />
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Technical Analysis - CAN Trading</title>
        <meta
          name="description"
          content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
        />
        <meta property="og:title" content="Technical Analysis - CAN Trading" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
        />
        <meta property="og:url" content="https://can-trading.com/analysis" />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technical Analysis - CAN Trading" />
        <meta
          name="twitter:description"
          content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <main className="bg-background min-h-screen px-4">
        <section id="most-recent" className="w-full flex justify-center pt-4">
          <div className="max-w-[100rem] w-full flex flex-col self-start sm:text-left">
            <h2 className="text-xl md:text-3xl font-bold mb-2 text-primary hover:text-primary-light transition-colors duration-200">
              Latest Technical Analysis
            </h2>
            {mostRecentElement}
          </div>
        </section>

        <section id="all-analysis" className="w-full flex justify-center">
          <AnalysisListContainer />
        </section>
        <div className="w-full flex justify-center mt-8">
          <BannerMini />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Analysis;
