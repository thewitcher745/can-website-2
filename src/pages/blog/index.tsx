import Head from "next/head";
import React, { useState } from "react";
import Footer from "@shared/ui/Footer";
import { ArticleMeta } from "@src/types";
import Listings from "@src/features/articles/slug/Listings";
import { GetStaticProps } from "next";
import { createListingGetStaticProps } from "@src/features/articles/listingIsr";

type BlogIndexProps = { items: ArticleMeta[] };

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
    ? items.filter((post) => filterTags?.some((tag) => post.tags.includes(tag)))
    : items;

  return (
    <>
      <Head>
        <title>Trading & Risk Management - CAN Trading</title>
      </Head>
      ""
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
