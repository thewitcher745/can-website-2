import { GetStaticProps } from "next";

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
import { getHighPotentialPosts } from "@src/domains/high-potential/api";
import { getAnalysisPosts } from "@src/domains/analysis/api";
import { getBlogPosts, getNewsPosts } from "@src/domains/articles/api";
import { HomePageProps, HomepageProvider } from "@src/contexts/HomepageContext";
import MetaTags from "@src/shared/MetaTags";

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
      <MetaTags
        title="CAN Trading"
        description="Professional cryptocurrency trading insights, technical analysis, news, and high-potential opportunities. Join CAN Trading for expert market analysis."
        canonicalUrl="https://can-trading.com"
        image="/images/showcase/can-banner.png"
        type="website"
      />
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
