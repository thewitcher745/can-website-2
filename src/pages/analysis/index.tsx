import Head from "next/head";

import Footer from "@src/shared/ui/Footer";
import MostRecent from "@features/homepage/components/most-recent-analysis/MostRecent";
import AnalysisListContainer from "@features/analysis/AnalysisListContainer";
import BannerMini from "@src/features/homepage/components/promotions/BannerMini";
import { GetStaticProps } from "next";
import { createListingGetStaticProps } from "@src/lib/isr/listing";
import { getAnalysisPosts } from "@src/domains/analysis/api";
import { ListedAnalysis } from "@src/domains/analysis/types";

type AnalysisIndexProps = { items: ListedAnalysis[] };

const Analysis: React.FC<AnalysisIndexProps> = ({ items: posts }) => {
  // Change number of posts based on screen size
  const mostRecentElement = (
    <div>
      <div className="items-center gap-4 w-full 2xl:block hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 12)} />
      </div>
      <div className="items-center gap-4 w-full md:max-2xl:block hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 9)} />
      </div>
      <div className="items-center gap-4 w-full sm:max-md:flex hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 6)} />
      </div>
      <div className="items-center gap-4 w-full xs:max-sm:flex hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 5)} />
      </div>
      <div className="items-center gap-4 w-full max-xs:flex hidden">
        <MostRecent recentAnalysis={[...posts, ...posts].slice(0, 3)} />
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Technical Analysis - CAN Trading</title>
        <meta
          name="description"
          content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
        />
        <meta property="og:title" content="Technical Analysis - CAN Trading" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
        />
        <meta property="og:url" content="https://can-trading.com/analysis" />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Technical Analysis - CAN Trading" />
        <meta
          name="twitter:description"
          content="Latest cryptocurrency technical analysis and market insights from CAN Trading experts"
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <main className="bg-background min-h-screen px-4">
        <section id="most-recent" className="w-full flex justify-center pt-4">
          <div className="max-w-[100rem] w-full flex flex-col self-start sm:text-left">
            <h2 className="text-xl md:text-3xl font-bold mb-2 text-primary hover:text-primary-light transition-colors duration-200">
              Latest Technical Analysis
            </h2>
            {mostRecentElement}
          </div>
        </section>

        <section id="all-analysis" className="w-full flex justify-center">
          <AnalysisListContainer posts={posts} />
        </section>
        <div className="w-full flex justify-center mt-8">
          <BannerMini />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Analysis;

export const getStaticProps: GetStaticProps<AnalysisIndexProps> =
  createListingGetStaticProps(getAnalysisPosts);
