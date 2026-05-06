import React from "react";
import Link from "next/link";

import { ListedArticle } from "@src/types";
import { formatRelativeTime } from "@src/utils";

type ListingsProps = {
  items: ListedArticle[];
  baseHref: string; // e.g. "/blog" | "/news" | "/fundamental"
  filterTags: string[] | null;
  onRemoveTag: (tag: string) => void;
  onClearFilters: () => void;
};

const Listings: React.FC<ListingsProps> = ({
  items,
  baseHref,
  filterTags,
  onRemoveTag,
  onClearFilters,
}) => {
  return (
    <>
      {filterTags && (
        <div className="mb-6 flex gap-2 flex-wrap flex-col items-start sm:flex-row">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onRemoveTag(tag)}
              className="bg-primary text-white text-xs px-3 py-1 rounded-full hover:bg-error-light"
            >
              {tag}
            </button>
          ))}
          <button
            className="ml-2 text-xs text-error-light hover:text-error underline"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}

      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {items.length === 0 ? (
          <div className="text-center text-text-muted">No articles found.</div>
        ) : (
          items.map((article) => (
            <div
              key={article.slug}
              className="flex flex-row flex-grow sm:flex-col p-2 sm:p-0 h-26 sm:h-70 md:h-100 rounded-sm sm:rounded-lg card-hover"
            >
              <div className="h-full w-30 sm:w-full sm:h-1/2 overflow-hidden rounded-sm sm:rounded-t-sm mb-2">
                <Link href={`${baseHref}/${article.slug}`}>
                  <img
                    src={article.meta.thumbnail}
                    alt={article.meta.title}
                    className="h-full w-full object-cover object-top"
                  />
                </Link>
              </div>

              <div className="w-1/2 h-full sm:h-1/2 sm:w-full sm:px-3 sm:pb-3 grow-1 flex flex-col justify-between">
                <div className="text-wrap h-full">
                  <div className="line-clamp-2 sm:line-clamp-3 md:line-clamp-4 lg:h-1/2 md:h-1/3">
                    <Link href={`${baseHref}/${article.slug}`}>
                      <h2 className="text-md font-normal mx-3 sm:mx-0 text-text-main hover:text-primary transition-colors mb-2">
                        {article.meta.title}
                      </h2>
                    </Link>
                  </div>
                  <div className="line-clamp-3">
                    <p className="text-text-muted hidden md:block text-sm mx-2 sm:mx-0 mb-3 md:h-1/2">
                      {article.meta.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-text-muted mb-1 mx-3 sm:mx-0">
                    {formatRelativeTime(new Date(article.meta.time), "long")}
                  </div>
                  <Link
                    href={`${baseHref}/${article.slug}`}
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
    </>
  );
};

export default Listings;
