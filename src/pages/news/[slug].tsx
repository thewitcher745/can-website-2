import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { buildApiUrl } from "../../config";

interface NewsArticle {
  author: string;
  content_html: string;
  time: string;
  slug: string;
  tags: string[];
  title: string;
}

const NewsArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(buildApiUrl(`/api/news/${slug}`))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news article.");
        return res.json();
      })
      .then(setArticle)
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

  if (!article)
    return (
      <>
        <Navbar />
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <span className="text-text-muted text-lg tracking-wide">
              Article not found.
            </span>
          </div>
        </main>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl mx-auto py-8 px-4 pt-24">
          <Link href="/news" className="text-primary hover:underline text-sm">
            ← Back to News
          </Link>
          <div className="bg-surface border border-border rounded-lg p-8 shadow mt-4">
            <h1 className="text-3xl font-bold mb-4 text-text-main hover:text-primary transition-colors">
              {article.title}
            </h1>
            <div className="text-xs text-text-muted mb-4">
              {new Date(article.time).toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              {new Date(article.time).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary-light text-secondary text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <article
              className="blog-article prose prose-invert text-red max-w-none text-text-main"
              dangerouslySetInnerHTML={{ __html: article.content_html }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NewsArticlePage;
