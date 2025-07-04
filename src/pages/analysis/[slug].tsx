import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { buildApiUrl } from "../../config";

interface AnalysisPost {
  author: string;
  content_html: string;
  time: string;
  slug: string;
  tags: string[];
  title: string;
}

const AnalysisPostPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [posts, setPosts] = useState<AnalysisPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(buildApiUrl(`/api/analysis/${slug}`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch analysis post");
        return res.json();
      })
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <>
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

  if (!posts || posts.length === 0)
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <span className="text-text-muted text-lg tracking-wide">
              Post not found.
            </span>
          </div>
        </main>
        <Footer />
      </>
    );

  const mainPost = posts[0];
  const updates = posts.slice(1);

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl mx-auto py-8 px-4 pt-24">
          <Link
            href="/analysis"
            className="text-primary hover:underline text-sm"
          >
            ← Back to Analysis
          </Link>
          <div className="bg-surface border border-border rounded-lg p-8 shadow mt-4">
            <h1 className="text-3xl font-bold mb-4 text-text-main hover:text-primary transition-colors">
              {mainPost.title}
            </h1>
            <div className="text-xs text-text-muted mb-4">
              {new Date(mainPost.time).toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              {new Date(mainPost.time).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>
            <article
              className="analysis-article prose prose-invert max-w-none text-text-main"
              dangerouslySetInnerHTML={{ __html: mainPost.content_html }}
            />
          </div>

          {/* Updates feed */}
          {updates.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Updates
              </h2>
              <div className="flex flex-col gap-4">
                {updates.map((update, idx) => (
                  <div
                    key={idx}
                    className="border-l-4 border-primary bg-surface px-6 py-3 rounded relative"
                  >
                    <div className="text-xs text-text-muted mb-1">
                      Update at{" "}
                      {new Date(update.time).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}{" "}
                      {new Date(update.time).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                    <article
                      className="analysis-article text-text-main text-sm"
                      dangerouslySetInnerHTML={{
                        __html: update.content_html,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AnalysisPostPage;
