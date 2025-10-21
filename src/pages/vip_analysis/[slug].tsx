import React, { useEffect, useState, useRef } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";

import Footer from "@shared/ui/Footer";
import { buildApiUrl } from "@src/config";
import { Article, AnalysisPostMeta } from "@src/types";
import ChartModal from "@src/features/analysis/slug/ChartModal";
import Update from "@src/features/analysis/slug/Update";
import MainPost from "@src/features/analysis/slug/MainPost";
import chartHighlighting from "@src/features/analysis/slug/chartHighlighting";

type AnalysisPostPageProps = { posts: Article[] };

const AnalysisPostPage: React.FC<AnalysisPostPageProps> = ({ posts }) => {
  const [modalImgSrc, setModalImgSrc] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const mainPost = posts[0];
  const updates = posts.slice(1);

  useEffect(
    chartHighlighting(contentRef, updates, setModalImgSrc, setModalVisible),
    [posts, updates, modalVisible]
  ); // Re-run when posts change

  if (!posts || posts.length === 0)
    return (
      <>
        <Head>
          <title>Post not found - CAN Trading</title>
        </Head>
        <main className="bg-background min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-[40vh] bg-background">
            <span className="text-text-muted text-lg tracking-wide">
              Post not found.
            </span>
          </div>
        </main>
        <Footer />
      </>
    );

  return (
    <>
      <Head>
        <title>{`${mainPost.title} - CAN Trading`}</title>
      </Head>
      <main className="bg-background flex justify-center min-h-screen">
        <div ref={contentRef} className="max-w-4xl mx-auto py-8 px-4 pt-6">
          <Link
            href="/analysis"
            className="text-primary hover:underline text-sm"
          >
            ← Back to Analysis
          </Link>
          <MainPost mainPost={mainPost} />

          {/* Updates feed */}
          {updates.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-primary">
                Updates
              </h2>
              <div className="flex flex-col gap-4">
                {updates.map((update, idx) => (
                  <Update
                    key={`${update.slug || "update"}-${idx}`}
                    update={update}
                    idx={idx}
                  />
                ))}
              </div>
            </div>
          )}
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(buildApiUrl(`/api/vip_analysis`));
    if (!res.ok) throw new Error("Failed to fetch analysis posts.");
    const data: AnalysisPostMeta[] = await res.json();
    const paths = (Array.isArray(data) ? data : []).map((post) => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<AnalysisPostPageProps> = async (
  context
) => {
  const slug = context.params?.slug as string;
  try {
    const res = await fetch(buildApiUrl(`/api/vip_analysis/${slug}`));
    if (!res.ok) {
      return { notFound: true, revalidate: 60 };
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return { notFound: true, revalidate: 60 };
    }
    return {
      props: { posts: data as Article[] },
      revalidate: 900,
    };
  } catch (e) {
    return { notFound: true, revalidate: 60 };
  }
};

export default AnalysisPostPage;
