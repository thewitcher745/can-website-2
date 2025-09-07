import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buildApiUrl } from "../../../config";

interface ArticleItemRaw {
  slug: string;
  thumbnail: string | null;
  title?: string;
  published_at?: string;
  publishedAt?: string;
  time?: string;
  timestamp?: string | number;
  date?: string;
}

interface ArticleItem {
  slug: string;
  thumbnail: string | null;
  title: string;
  publishedAt: Date | null;
}

const RecentArticlesTable = ({ className }: { className?: string }) => {
  const [news, setNews] = useState<ArticleItem[]>([]);
  const [fundamentals, setFundamentals] = useState<ArticleItem[]>([]);
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
        raw.published_at ??
        raw.publishedAt ??
        raw.time ??
        raw.timestamp ??
        raw.date ??
        null;
      return {
        slug: raw.slug,
        thumbnail: raw.thumbnail ?? null,
        title: raw.title ?? "Untitled",
        publishedAt: parseDate(publishedCandidate as unknown),
      };
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [newsRes, fundRes] = await Promise.all([
          fetch(buildApiUrl(`/api/recent_news`)),
          fetch(buildApiUrl(`/api/recent_fundamental`)),
        ]);

        if (!newsRes.ok) throw new Error("Failed to fetch recent news");
        if (!fundRes.ok) throw new Error("Failed to fetch recent fundamental");

        const newsJson: ArticleItemRaw[] = await newsRes.json();
        const fundJson: ArticleItemRaw[] = await fundRes.json();

        setNews(newsJson.map(normalizeItem));
        setFundamentals(fundJson.map(normalizeItem));
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
      { title: "Recent News", data: news, slug: "news" },
      {
        title: "Fundamental Analysis",
        data: fundamentals,
        slug: "fundamental",
      },
    ],
    [news, fundamentals]
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

  const formatRelativeTime = (date: Date | null): string => {
    if (!date) return "";
    const now = Date.now();
    const diffMs = now - date.getTime();
    if (diffMs < 0) return date.toLocaleString();
    const sec = Math.floor(diffMs / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return `${day}d ago`;
    return date.toLocaleDateString();
  };

  const renderTableRows = (
    items: ArticleItem[],
    tableSlug: string = "news"
  ) => {
    const rows = [] as React.ReactNode[];
    for (let i = 0; i < 4; i++) {
      const item = items[i];
      rows.push(
        <tr key={i} className="border-b border-border h-1/4">
          {item ? (
            <div className="py-2">
              <Link href={`/${tableSlug}/${item.slug}`}>
                <div className="flex gap-2 items-center px-1 w-full">
                  <Image
                    width={160}
                    height={120}
                    src={
                      item.thumbnail
                        ? item.thumbnail
                        : `http://static.photos/finance/320x240/${item.slug}`
                    }
                    className="flex-grow h-12 w-16"
                    alt={item.title}
                  />

                  <div className="w-5/6 flex flex-col items-start gap-1">
                    <span
                      className="block truncate max-w-full text-sm"
                      title={item.title}
                    >
                      {item.title}
                    </span>
                    <span className="py-1 w-1/4 text-left text-text-muted text-xs">
                      {formatRelativeTime(item.publishedAt)}
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
        </tr>
      );
    }
    return rows;
  };

  return (
    <div
      className={`bg-surface p-3 rounded-md w-full max-w-md flex flex-col ${className}`}
    >
      <div className="flex justify-between flex-col-reverse sm:flex-row items-center mb-1">
        <Link href={`/${tables[currentIndex].slug}`}>
          <div className="flex">
            <h3 className="text-lg underline font-bold text-text-main">
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
              <div key={index} className="w-full h-full flex-shrink-0">
                <table className="w-full h-full text-left text-text-main table-fixed">
                  <tbody>{renderTableRows(table.data, table.slug)}</tbody>
                </table>
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
