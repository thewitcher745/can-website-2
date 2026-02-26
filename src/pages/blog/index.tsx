import Head from "next/head";
import React, { useState } from "react";

import Footer from "@shared/ui/Footer";
import { ListedArticle } from "@src/types";
import Listings from "@src/features/articles/Listings";
import { GetStaticProps } from "next";
import { createListingGetStaticProps } from "@src/features/articles/listingIsr";

type BlogIndexProps = { items: ListedArticle[] };

const Blog: React.FC<BlogIndexProps> = ({ items }) => {
  const [filterTags, setFilterTags] = useState<string[] | null>(null);

  const removeTag = (tag: string) => {
    if (filterTags?.length === 1) {
      setFilterTags(null);
    } else {
      setFilterTags((prev) => prev?.filter((t) => t !== tag) || null);
    }
  };

  const filteredPosts = filterTags
    ? items.filter((post) =>
        filterTags?.some((tag) => post.meta.tags.includes(tag)),
      )
    : items;

  return (
    <>
      <Head>
        <title>Trading and Risk Management - CAN Trading</title>
        <meta
          name="description"
          content="Insights, news, and analysis about cryptocurrency markets and trading strategies from CAN Trading"
        />
        <meta
          property="og:title"
          content="Trading and Risk Management - CAN Trading"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Insights, news, and analysis about cryptocurrency markets and trading strategies from CAN Trading"
        />
        <meta property="og:url" content="https://can-trading.com/blog" />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Trading and Risk Management - CAN Trading"
        />
        <meta
          name="twitter:description"
          content="Insights, news, and analysis about cryptocurrency markets and trading strategies from CAN Trading"
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl xl:max-w-6xl mx-auto py-8 px-4 pt-6">
          <h1 className="text-3xl font-bold mb-8 text-primary px-2">
            Trading & Risk Management
          </h1>
          <p className="text-text-main text-xl mb-6 px-2">
            Explore the latest insights and stories from our team of experts.
          </p>
          <Listings
            items={filteredPosts}
            baseHref="/blog"
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

export default Blog;

export const getStaticProps: GetStaticProps<BlogIndexProps> =
  createListingGetStaticProps("/api/blog");
