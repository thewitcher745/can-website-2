import React, { useEffect, useState, useRef } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";

import Footer from "@shared/ui/Footer";
import ChartModal from "@src/features/analysis/slug/ChartModal";
import Update from "@src/features/analysis/slug/Update";
import MainPost from "@src/features/analysis/slug/MainPost";
import chartHighlighting from "@src/features/analysis/slug/chartHighlighting";
import Banner from "@src/features/homepage/components/promotions/BannerMini";
import { getAnalysisPost, getAnalysisPosts } from "@src/domains/analysis/api";
import { AnalysisPost } from "@src/domains/analysis/types";

type AnalysisPostProps = { post: AnalysisPost };

const AnalysisPostPage: React.FC<AnalysisPostProps> = ({ post }) => {
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(chartHighlighting(contentRef, setModalImgSrc, setModalVisible), [
    post,
    modalVisible,
  ]);

  const updates = post.content.updates || [];

  return (
    <>
      <Head>
        <title>{`${post.meta.title} - CAN Trading`}</title>
        <meta property="og:title" content={post.meta.title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={post.meta.description || "Technical analysis by CAN Trading"}
        />
        <meta
          property="og:url"
          content={`https://can-trading.com/analysis/${post.slug}`}
        />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.meta.title} />
        <meta
          name="twitter:description"
          content={post.meta.description || "Technical analysis by CAN Trading"}
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <main className="bg-background flex flex-col items-center min-h-screen">
        <div
          ref={contentRef}
          className="max-w-4xl w-full mx-auto py-8 px-4 pt-6"
        >
          <Link
            href="/analysis"
            className="text-primary hover:underline text-sm"
          >
            ← Back to Analysis
          </Link>
          <MainPost post={post} />

          {/* Updates feed */}
          {updates.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Updates
              </h2>
              <div className="flex flex-col gap-4">
                {updates.map((update, idx) => (
                  <Update
                    key={`update-${idx}`}
                    updateBody={update}
                    time={update.time}
                  />
                ))}
              </div>
            </div>
          )}

          <Banner />
        </div>
        {modalImgSrc && modalVisible && (
          <ChartModal
            imgSrc={modalImgSrc}
            closeModal={() => setModalVisible(false)}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  try {
    const res = await getAnalysisPosts();

    const paths = res.data.map((post) => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<AnalysisPostProps> = async (
  context,
) => {
  const slug = context.params?.slug as string;

  try {
    const res = await getAnalysisPost(slug);
    return {
      props: {
        post: res.data,
      },
      revalidate: 3600,
    };
  } catch {
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export default AnalysisPostPage;
