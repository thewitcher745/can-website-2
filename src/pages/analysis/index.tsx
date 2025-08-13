import Head from "next/head";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostThumbnail from "../../components/analysis/PostThumbnail";
import PostTags from "../../components/analysis/PostTags";
import PostTitle from "../../components/analysis/PostTitle";
import PostDescription from "../../components/analysis/PostDescription";
import PostTime from "../../components/analysis/PostTime";
import { buildApiUrl } from "../../config";

interface AnalysisPostMeta {
  thumbnail_link: string;
  author: string;
  time: string;
  slug: string;
  tags: string[];
  title: string;
  desc: string;
}

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
          <title>CAN Trading - Analysis</title>
        </Head>
        <Navbar />
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
        <Navbar />
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

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl lg:max-w-6xl mx-auto py-8 px-4 pt-24">
          <h1 className="text-3xl font-bold mb-8 text-primary">Analysis</h1>
          <p className="text-text-main text-xl mb-6 px-2">
            You can find our reliable, accurate and profitable premium analysis
            for different coins here.
          </p>
          <div className="space-y-4 lg:space-y-0 lg:grid grid-cols-2 gap-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center text-text-muted">No posts found.</div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className="bg-surface border border-border rounded-lg p-6 shadow transition hover:shadow-lg flex sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
                >
                  <div className="flex w-full flex-col">
                    <PostThumbnail
                      thumbnailLink={post.thumbnail_link}
                      altText={`${post.title} logo`}
                      className={"block sm:hidden flex-grow self-center"}
                    />
                    <div className="flex justify-evenly flex-grow">
                      <PostThumbnail
                        thumbnailLink={post.thumbnail_link}
                        altText={`${post.title} logo`}
                        hiddenOnMobile
                      />
                      <PostTitle
                        title={post.title}
                        slug={post.slug}
                        className="self-center text-center sm:text-left"
                      />
                    </div>
                    <PostDescription description={post.desc} />
                    <div className="flex gap-2 mb-4 flex-grow justify-between flex-wrap">
                      <PostTags tags={post.tags} />
                      <PostTime time={post.time} className="self-end" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Analysis;
