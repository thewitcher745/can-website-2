import Head from "next/head";

import Footer from "../shared/ui/Footer";
import OurStats from "@features/homepage/components/promotions/ourStats/OurStats";
import Banner from "@features/homepage/components/promotions/Banner";
import TopRowGadgetsSection from "@features/homepage/sections/TopRowGadgetsSection";
import MostRecentAnalysisSection from "@features/homepage/sections/MostRecentAnalysisSection";
import VideosSection from "@features/homepage/sections/VideosSection";
import HeatmapSection from "@features/homepage/sections/HeatmapSection";
import TopMarketCapCoinsSection from "@features/homepage/sections/TopMarketCapCoinsSection";
import HighPotentialTokensSection from "@features/homepage/sections/HighPotentialTokensSection";
import HeroSection from "@src/features/homepage/sections/HeroSection";
import { GetStaticProps } from "next";
import { getHighPotentialPosts } from "@src/domains/high-potential/api";
import { getAnalysisPosts } from "@src/domains/analysis/api";
import { getBlogPosts, getNewsPosts } from "@src/domains/articles/api";
import { HomePageProps, HomepageProvider } from "@src/contexts/HomepageContext";

export default function Home({
  analysisPosts,
  blogPosts,
  newsPosts,
  highPotentialPosts,
}: HomePageProps) {
  return (
    <HomepageProvider
      value={{ analysisPosts, blogPosts, newsPosts, highPotentialPosts }}
    >
      <Head>
        <title>Home - CAN Trading</title>
        <meta
          name="description"
          content="CAN Trading - Professional cryptocurrency analysis and trading signals"
        />
        <meta property="og:title" content="CAN Trading" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Professional cryptocurrency analysis and trading signals"
        />
        <meta property="og:url" content="https://can-trading.com/" />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CAN Trading" />
        <meta
          name="twitter:description"
          content="Professional cryptocurrency analysis and trading signals"
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <main className="py-20 w-full bg-background flex flex-col items-center min-h-screen">
        <HeroSection />
        <div className="px-4 w-full flex flex-col justify-center items-center">
          <TopRowGadgetsSection />
          {/* Since other pages use this element too, the posts are passed using props instead of the context. */}
          <MostRecentAnalysisSection posts={analysisPosts} />
          <TopMarketCapCoinsSection />
          <VideosSection />
          <HighPotentialTokensSection />
          <HeatmapSection />
          <OurStats />
          <div className="w-full sm:pt-0 flex justify-center">
            <Banner />
          </div>
        </div>
      </main>
      <Footer />
    </HomepageProvider>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const [analysisRes, blogRes, newsRes, highPotentialRes] = await Promise.all(
      [
        getAnalysisPosts(10),
        getBlogPosts(10),
        getNewsPosts(10),
        getHighPotentialPosts(10),
      ],
    );

    return {
      props: {
        analysisPosts: analysisRes.data,
        blogPosts: blogRes.data,
        newsPosts: newsRes.data,
        highPotentialPosts: highPotentialRes.data,
      },
      revalidate: 600,
    };
  } catch {
    return {
      props: {
        analysisPosts: [],
        blogPosts: [],
        newsPosts: [],
        highPotentialPosts: [],
      },
      revalidate: 10,
    };
  }
};
