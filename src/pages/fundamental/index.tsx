import Head from "next/head";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { buildApiUrl } from "../../config";
import { formatRelativeTime } from "../../utils";

interface FundamentalPostMeta {
  author: string;
  time: string;
  slug: string;
  tags: string[];
  title: string;
  desc: string;
  thumbnail: string;
}

const Fundamental: React.FC = () => {
  const [posts, setPosts] = useState<FundamentalPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterTags, setFilterTags] = useState<string[] | null>(null);

  useEffect(() => {
    fetch(buildApiUrl(`/api/fundamental`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch fundamental posts");
        return res.json();
      })
      .then(setPosts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const removeTag = (tag: string) => {
    if (filterTags?.length === 1) {
      setFilterTags(null);
    } else {
      setFilterTags((prev) => prev?.filter((t) => t !== tag));
    }
  };

  const filteredPosts = filterTags
    ? posts.filter((post) => filterTags?.some((tag) => post.tags.includes(tag)))
    : posts;

  if (loading)
    return (
      <>
        <Head>
          <title>Fundamental Analysis - CAN Trading</title>
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
        <Head>
          <title>Error - Fundamental Analysis - CAN Trading</title>
        </Head>
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
      <Head>
        <title>Fundamental Analysis - CAN Trading</title>
      </Head>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl xl:max-w-6xl mx-auto py-8 px-4 pt-24">
          <h1 className="text-3xl font-bold mb-8 text-primary px-2">
            Fundamental Analysis
          </h1>
          <p className="text-text-main text-xl mb-6 px-2">
            Discover the latest insights into fundamental analysis and gain a
            deeper understanding of the markets.
          </p>
          {filterTags && (
            <div className="mb-6 flex gap-2 flex-wrap flex-col items-start sm:flex-row">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className="bg-primary text-white text-xs px-3 py-1 rounded-full hover:bg-error-light"
                >
                  {tag}
                </button>
              ))}
              <button
                className="ml-2 text-xs text-error-light hover:text-error underline"
                onClick={() => setFilterTags(null)}
              >
                Clear Filters
              </button>
            </div>
          )}
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {filteredPosts.length === 0 ? (
              <div className="text-center text-text-muted">
                No articles found.
              </div>
            ) : (
              filteredPosts.map((article) => (
                <div
                  key={article.slug}
                  className="flex flex-row flex-grow sm:flex-col p-2 sm:p-0 h-26 sm:h-70 md:h-100 rounded-sm sm:rounded-sm hover:shadow-md transition"
                >
                  <div className="h-full w-30 sm:w-full sm:h-1/2 overflow-hidden rounded-sm sm:rounded-t-sm mb-2">
                    <Link href={`/fundamental/${article.slug}`}>
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="h-full w-full"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="w-1/2 h-full sm:h-1/2 sm:w-full sm:px-3 sm:pb-3 grow-1 flex flex-col justify-between">
                    <div className="text-wrap h-full">
                      <div className="line-clamp-2 sm:line-clamp-3 md:line-clamp-4 lg:h-1/2 md:h-1/3">
                        <h2 className="text-md font-normal mx-3 sm:mx-0 text-text-main hover:text-primary transition-colors mb-2">
                          <Link href={`/fundamental/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h2>
                      </div>
                      <div className="line-clamp-3">
                        <span className="text-text-muted hidden md:block text-sm mx-2 sm:mx-0 mb-3 md:h-1/2">
                          {article.desc}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="text-sm text-text-muted mb-1 mx-3 sm:mx-0">
                        {formatRelativeTime(new Date(article.time), "long")}
                      </div>

                      {/* <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag}
                            className={`opacity-70 text-text-muted hover:bg-secondary hover:text-white text-xs px-2 py-1 rounded transition`}
                            onClick={() =>
                              setFilterTags((prev) =>
                                prev && prev.includes(tag)
                                  ? prev
                                  : [...(prev || []), tag]
                              )
                            }
                            type="button"
                          >
                            {tag}
                          </button>
                        ))}
                      </div> */}
                      <Link
                        href={`/fundamental/${article.slug}`}
                        className="text-sm text-primary underline hover:text-primary-soft transition"
                      >
                        More →
                      </Link>
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

export default Fundamental;
