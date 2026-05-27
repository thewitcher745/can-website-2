import React, { useState } from "react";

import Footer from "@shared/ui/Footer";
import Index from "@src/features/articles/Index";
import { GetStaticProps } from "next";
import { getNewsPosts } from "@src/domains/articles/api";
import { createListingGetStaticProps } from "@src/lib/isr/listing";
import { ListedArticle } from "@src/domains/articles/types";
import MetaTags from "@src/shared/MetaTags";

type NewsIndexProps = { items: ListedArticle[] };

const News: React.FC<NewsIndexProps> = ({ items: posts }) => {
  const [filterTags, setFilterTags] = useState<string[] | null>(null);

  const removeTag = (tag: string) => {
    if (filterTags?.length === 1) {
      setFilterTags(null);
    } else {
      setFilterTags((prev) => prev?.filter((t) => t !== tag) || null);
    }
  };

  const filteredArticles = filterTags
    ? posts.filter((article) =>
        filterTags?.some((tag) => article.meta.tags.includes(tag)),
      )
    : posts;

  return (
    <>
      <MetaTags
        title="Latest Crypto News"
        description="Latest cryptocurrency news, regulatory updates, and market-moving events. Stay informed with CAN Trading"
        canonicalUrl="https://can-trading.com/news"
        image="/images/showcase/can-banner.png"
      />
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl xl:max-w-6xl mx-auto py-8 pt-6 px-4">
          <h1 className="text-3xl font-bold mb-8 text-primary px-2">News</h1>
          <p className="text-text-main text-xl mb-6 px-2">
            Stay updated with the latest news and announcements from CAN
            Trading.
          </p>
          <Index
            items={filteredArticles}
            baseHref="/news"
            filterTags={filterTags}
            onRemoveTag={removeTag}
            onClearFilters={() => setFilterTags(null)}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default News;

export const getStaticProps: GetStaticProps<NewsIndexProps> =
  createListingGetStaticProps(getNewsPosts);
