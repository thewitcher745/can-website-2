import Head from "next/head";
import React, { useState } from "react";
import Footer from "@shared/ui/Footer";
import { ArticleMeta } from "@src/types";
import Listings from "@src/features/articles/Listings";
import { GetStaticProps } from "next";
import { createListingGetStaticProps } from "@src/features/articles/listingIsr";

type FundamentalIndexProps = { items: ArticleMeta[] };

const Fundamental: React.FC<FundamentalIndexProps> = ({ items }) => {
  const [filterTags, setFilterTags] = useState<string[] | null>(null);

  const removeTag = (tag: string) => {
    if (filterTags?.length === 1) {
      setFilterTags(null);
    } else {
      setFilterTags((prev) => prev?.filter((t) => t !== tag) || null);
    }
  };

  const filteredPosts = filterTags
    ? items.filter((post) => filterTags?.some((tag) => post.tags.includes(tag)))
    : items;

  return (
    <>
      <Head>
        <title>Fundamental Analysis - CAN Trading</title>
      </Head>
      ""
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl xl:max-w-6xl mx-auto py-8 px-4 pt-6">
          <h1 className="text-3xl font-bold mb-8 text-primary px-2">
            Fundamental Analysis
          </h1>
          <p className="text-text-main text-xl mb-6 px-2">
            Discover the latest insights into fundamental analysis and gain a
            deeper understanding of the markets.
          </p>
          <Listings
            items={filteredPosts}
            baseHref="/fundamental"
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

export default Fundamental;

export const getStaticProps: GetStaticProps<FundamentalIndexProps> =
  createListingGetStaticProps("/api/fundamental");
