// import Head from "next/head";
// import React, { useState } from "react";
// import Footer from "@shared/ui/Footer";
// import { ArticlePost } from "@src/types";
// import Listings from "@src/features/articles/Listings";
// import { GetStaticProps } from "next";
// import { createListingGetStaticProps } from "@src/features/articles/listingIsr";

// type FundamentalIndexProps = { items: ListedArticle[] };

// const Fundamental: React.FC<FundamentalIndexProps> = ({ items }) => {
//   const [filterTags, setFilterTags] = useState<string[] | null>(null);

//   const removeTag = (tag: string) => {
//     if (filterTags?.length === 1) {
//       setFilterTags(null);
//     } else {
//       setFilterTags((prev) => prev?.filter((t) => t !== tag) || null);
//     }
//   };

//   const filteredPosts = filterTags
//     ? items.filter((post) => filterTags?.some((tag) => post.meta.tags.includes(tag)))
//     : items;

//   return (
//     <>
//       <Head>
//         <title>Fundamental Analysis - CAN Trading</title>
//         <meta name="description" content="In-depth fundamental analysis of cryptocurrencies and blockchain projects. Research reports, tokenomics, and project evaluations." />
//         <meta property="og:title" content="Fundamental Analysis - CAN Trading" />
//         <meta property="og:type" content="website" />
//         <meta property="og:description" content="In-depth fundamental analysis of cryptocurrencies and blockchain projects. Research reports, tokenomics, and project evaluations." />
//         <meta property="og:url" content="https://can-trading.com/fundamental" />
//         <meta property="og:site_name" content="CAN Trading" />
//         <meta property="og:image" content="/images/showcase/can-banner.png" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Fundamental Analysis - CAN Trading" />
//         <meta name="twitter:description" content="In-depth fundamental analysis of cryptocurrencies and blockchain projects. Research reports, tokenomics, and project evaluations." />
//         <meta name="twitter:image" content="/images/showcase/can-banner.png" />
//       </Head>
//       ""
//       <main className="bg-background min-h-screen">
//         <div className="max-w-4xl xl:max-w-6xl mx-auto py-8 px-4 pt-6">
//           <h1 className="text-3xl font-bold mb-8 text-primary px-2">
//             Fundamental Analysis
//           </h1>
//           <p className="text-text-main text-xl mb-6 px-2">
//             Discover the latest insights into fundamental analysis and gain a
//             deeper understanding of the markets.
//           </p>
//           <Listings
//             items={filteredPosts}
//             baseHref="/fundamental"
//             filterTags={filterTags}
//             onRemoveTag={removeTag}
//             onClearFilters={() => setFilterTags(null)}
//           />
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// };

const Fundamental = () => {
  return <div></div>;
};

export default Fundamental;

// export const getStaticProps: GetStaticProps<FundamentalIndexProps> =
//   createListingGetStaticProps("/api/fundamental");
