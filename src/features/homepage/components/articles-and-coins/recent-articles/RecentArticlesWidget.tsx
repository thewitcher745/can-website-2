import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { ListedArticle } from "@src/domains/articles/types";
import TableRow from "./TableRow";
import { useRecentArticlesWidget } from "@src/domains/articles/hooks";
import { GenericLoader } from "@src/shared/ui/loaders";
import GenericError from "@src/shared/ui/GenericError";

const N_POSTS = 4;
const N_TABLES = 2;

const RecentArticlesWidget = ({ className }: { className?: string }) => {
  const { data, loading, error } = useRecentArticlesWidget();
  const [currentIndex, setCurrentIndex] = useState(0);

  const blog = data.blog;
  const news = data.news;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % N_TABLES);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? N_TABLES - 1 : prevIndex - 1,
    );
  };

  const NavigationButtons = ({ className }: { className?: string }) => {
    return (
      <div className={`flex-nowrap justify-center items-center ${className}`}>
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

  const renderTableRows = (items: ListedArticle[], tableSlug: string) => {
    const rows = [] as React.ReactNode[];

    if (loading || error || !items) {
      for (let i = 0; i < N_POSTS; i++) {
        rows.push(<TableRow placeholder tableSlug={tableSlug} i={i} />);
      }
    } else {
      for (let i = 0; i < N_POSTS; i++) {
        const item = items[i];

        rows.push(<TableRow item={item} tableSlug={tableSlug} i={i} />);
      }
    }

    return rows;
  };

  const renderContent = (blog: ListedArticle[], news: ListedArticle[]) => {
    const tables = [
      {
        title: "Trading & Risk Management",
        data: blog || [],
        slug: "blog",
      },
      { title: "Recent News", data: news || [], slug: "news" },
    ];

    return (
      <div className={`px-3 rounded-md flex flex-col h-full ${className}`}>
        <div className="flex justify-between flex-col-reverse sm:flex-row items-center mb-1">
          <Link href={`/${tables[currentIndex].slug}`}>
            <div className="flex">
              <h2 className="text-lg underline font-bold text-text-main title-hover">
                {tables[currentIndex].title}
              </h2>
              <ChevronRight className="h-8 w-8 text-text-muted self-end" />
            </div>
          </Link>
          <NavigationButtons className="hidden sm:flex" />
        </div>
        <div className="overflow-hidden h-full">
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
        </div>
        <NavigationButtons className="block sm:hidden self-center" />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="relative">
        {/* Blurred skeleton */}
        <div className="blur-sm pointer-events-none h-full animate-pulse">
          {renderContent([], [])}
        </div>

        {/* Loader overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericLoader />
        </div>
      </div>
    );
  }

  if (error || !blog || !news) {
    return (
      <div className="relative">
        {/* Blurred skeleton */}
        <div className="blur-sm pointer-events-none h-full">
          {renderContent([], [])}
        </div>

        {/* Loader overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <GenericError message="Couldn't get recent articles. Try again later!" />
        </div>
      </div>
    );
  }

  return renderContent(blog, news);
};

export default RecentArticlesWidget;
