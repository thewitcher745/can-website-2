import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { buildApiUrl } from "@src/config";
import { formatRelativeTime } from "@src/utils";
import { ArticleItem, ArticleItemRaw } from "@src/types";

const RecentArticlesTable = ({ className }: { className?: string }) => {
  const [news, setNews] = useState<ArticleItem[]>([]);
  const [fundamentals, setFundamentals] = useState<ArticleItem[]>([]);
  const [blog, setBlog] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const parseDate = (value: unknown): Date | null => {
      if (!value && value !== 0) return null;
      try {
        if (typeof value === "number") return new Date(value);
        if (typeof value === "string") {
          const num = Number(value);
          if (!Number.isNaN(num) && value.trim() !== "") {
            return new Date(num);
          }
          const d = new Date(value);
          return isNaN(d.getTime()) ? null : d;
        }
        return null;
      } catch {
        return null;
      }
    };

    const normalizeItem = (raw: ArticleItemRaw): ArticleItem => {
      const publishedCandidate =
        raw.publishedAt ?? raw.time ?? raw.timestamp ?? raw.date ?? null;
      return {
        slug: raw.slug,
        thumbnail: raw.thumbnail,
        title: raw.title,
        publishedAt: parseDate(publishedCandidate as unknown)!,
      };
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [blogRes, newsRes, fundRes] = await Promise.all([
          fetch(buildApiUrl(`/api/blog`)),
          fetch(buildApiUrl(`/api/recent_news`)),
          fetch(buildApiUrl(`/api/recent_fundamental`)),
        ]);

        if (!blogRes.ok) throw new Error("Failed to fetch recent blog posts.");
        if (!newsRes.ok) throw new Error("Failed to fetch recent news.");
        if (!fundRes.ok) throw new Error("Failed to fetch recent fundamental.");

        const blogJson: ArticleItemRaw[] = await blogRes.json();
        const newsJson: ArticleItemRaw[] = await newsRes.json();
        const fundJson: ArticleItemRaw[] = await fundRes.json();

        setNews(newsJson.map(normalizeItem));
        setFundamentals(fundJson.map(normalizeItem));
        setBlog(blogJson.map(normalizeItem));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tables = useMemo(
    () => [
      {
        title: "Blog",
        data: blog,
        slug: "blog",
      },
      { title: "Recent News", data: news, slug: "news" },
      {
        title: "Fundamental Analysis",
        data: fundamentals,
        slug: "fundamental",
      },
    ],
    [news, fundamentals, blog]
  );

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tables.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tables.length - 1 : prevIndex - 1
    );
  };

  const NavigationButtons = ({ className }: { className?: string }) => {
    return (
      <div className={`flex-nowrap ${className}`}>
        <button
          onClick={prevSlide}
          className="p-3 rounded-full hover:bg-surface-hover cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 text-text-main" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full hover:bg-surface-hover cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 text-text-main" />
        </button>
      </div>
    );
  };

  const renderTableRows = (
    items: ArticleItem[],
    tableSlug: string = "news"
  ) => {
    const rows = [] as React.ReactNode[];
    for (let i = 0; i < 4; i++) {
      const item = items[i];
      rows.push(
        <div
          key={i}
          className="flex items-center h-1/4 border-b border-border hover:bg-surface transition-all duration-200"
        >
          {item ? (
            <div className="py-2">
              <Link href={`/${tableSlug}/${item.slug}`}>
                <div className="flex h-full items-center gap-2 px-1 w-full">
                  <div className="flex-grow h-14 w-20">
                    <img
                      src={
                        item.thumbnail
                          ? item.thumbnail
                          : `http://static.photos/finance/320x240/${item.slug}`
                      }
                      className="rounded object-cover flex-grow h-14 w-20"
                      alt={item.title}
                    />
                  </div>

                  <div className="w-5/6 flex flex-col items-start gap-1">
                    <span
                      className="block truncate max-w-full text-sm"
                      title={item.title}
                    >
                      {item.title}
                    </span>
                    <span className="py-1 w-1/4 text-left text-text-muted text-xs">
                      {formatRelativeTime(item.publishedAt, "short")}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <>
              <td className="px-4 py-2 w-3/4">&nbsp;</td>
              <td className="px-4 py-2 w-1/4">&nbsp;</td>
            </>
          )}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className={`p-3 rounded-md flex flex-col ${className}`}>
      <div className="flex justify-between flex-col-reverse sm:flex-row items-center mb-1">
        <Link href={`/${tables[currentIndex].slug}`}>
          <div className="flex">
            <h3 className="text-lg underline font-bold text-text-main title-hover">
              {tables[currentIndex].title}
            </h3>
            <ChevronRight className="h-8 w-8 text-text-muted self-end" />
          </div>
        </Link>
        <NavigationButtons className="hidden sm:block" />
      </div>
      <div className="overflow-hidden  h-full">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-error w-full h-full text-center p-4">
            Error: {error}
          </div>
        ) : (
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {tables.map((table, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 overflow-hidden"
              >
                <div className="w-full h-full text-left text-text-main">
                  {renderTableRows(table.data, table.slug)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <NavigationButtons className="block sm:hidden self-center" />
    </div>
  );
};

export default RecentArticlesTable;
