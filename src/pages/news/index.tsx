import Head from "next/head";
import React, { useState } from "react";
import Footer from "@shared/ui/Footer";
import { ArticleMeta } from "@src/types";
import Listings from "@src/features/articles/slug/Listings";
import { GetStaticProps } from "next";
import { createListingGetStaticProps } from "@src/features/articles/listingIsr";

type NewsIndexProps = { items: ArticleMeta[] };

const News: React.FC<NewsIndexProps> = ({ items }) => {
  const [filterTags, setFilterTags] = useState<string[] | null>(null);

  const removeTag = (tag: string) => {
    if (filterTags?.length === 1) {
      setFilterTags(null);
    } else {
      setFilterTags((prev) => prev?.filter((t) => t !== tag) || null);
    }
  };

  const filteredArticles = filterTags
    ? items.filter((article) => filterTags?.some((tag) => article.tags.includes(tag)))
    : items;

  return (
    <>
      <Head>
        <title>News - CAN Trading</title>
      </Head>
      ""
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl xl:max-w-6xl mx-auto py-8 pt-6 px-4">
          <h1 className="text-3xl font-bold mb-8 text-primary px-2">News</h1>
          <p className="text-text-main text-xl mb-6 px-2">
            Stay updated with the latest news and announcements from CAN Trading.
          </p>
          <Listings
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
  createListingGetStaticProps("/api/news");
