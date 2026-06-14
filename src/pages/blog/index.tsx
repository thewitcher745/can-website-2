import React, { useState } from "react";

import Footer from "@shared/ui/Footer";
import { ListedArticle } from "@src/domains/articles/types";
import Index from "@src/features/articles/Index";
import { GetStaticProps } from "next";
import { createListingGetStaticProps } from "@src/lib/isr/listing";
import { getBlogPosts } from "@src/domains/articles/api";
import MetaTags from "@src/shared/MetaTags";

type BlogIndexProps = { items: ListedArticle[] };

const Blog: React.FC<BlogIndexProps> = ({ items: posts }) => {
  const [filterTags, setFilterTags] = useState<string[] | null>(null);

  const removeTag = (tag: string) => {
    if (filterTags?.length === 1) {
      setFilterTags(null);
    } else {
      setFilterTags((prev) => prev?.filter((t) => t !== tag) || null);
    }
  };

  const filteredPosts = filterTags
    ? posts.filter((post) =>
        filterTags?.some((tag) => post.meta.tags.includes(tag)),
      )
    : posts;

  return (
    <>
      <MetaTags
        title="CAN Magazine"
        description="Learn professional trading strategies, risk management techniques, and market psychology from experienced traders."
        canonicalUrl="https://can-trading.com/blog"
        image="/images/showcase/can-banner.png"
      />
      <main className="bg-background min-h-screen">
        <div className="max-w-4xl xl:max-w-6xl mx-auto py-8 px-4 pt-6">
          <h1 className="text-3xl font-bold mb-8 text-primary px-2">
            CAN Magazine
          </h1>
          <p className="text-text-main text-xl mb-6 px-2">
            Explore the latest insights and stories from our team of experts.
          </p>
          <Index
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
  createListingGetStaticProps(getBlogPosts);
