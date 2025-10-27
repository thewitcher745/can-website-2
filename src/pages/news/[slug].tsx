import React from "react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Footer from "@shared/ui/Footer";
import { buildApiUrl } from "@src/config";
import { Article } from "@src/types";
import ArticleElement from "@src/features/articles/slug/ArticleElement";

type NewsArticlePageProps = { article: Article };

const NewsArticlePage: React.FC<NewsArticlePageProps> = ({ article }) => {
  return (
    <>
      <Head>
        <title>{`${article.title} - CAN Trading`}</title>
      </Head>
      <main className="bg-background min-h-screen">
        <ArticleElement article={article} backHref="/news" backText="News" />
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(buildApiUrl(`/api/news`));
    if (!res.ok) throw new Error("Failed to fetch news slugs");
    const data: Array<{ slug: string }> = await res.json();
    const paths = (Array.isArray(data) ? data : []).map((post) => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<NewsArticlePageProps> = async (
  context
) => {
  const slug = context.params?.slug as string;
  try {
    const res = await fetch(buildApiUrl(`/api/news/${slug}`));
    if (!res.ok) return { notFound: true, revalidate: 60 };
    const data = await res.json();
    if (!data) return { notFound: true, revalidate: 60 };
    return { props: { article: data as Article }, revalidate: 21600 };
  } catch (e) {
    return { notFound: true, revalidate: 60 };
  }
};

export default NewsArticlePage;
