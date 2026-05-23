import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import Footer from "@shared/ui/Footer";
import ArticleElement from "@src/features/articles/slug/ArticleElement";
import Banner from "@src/features/homepage/components/promotions/BannerMini";
import { ArticlePost } from "@src/domains/articles/types";
import { getBlogPost, getBlogPosts } from "@src/domains/articles/api";

type BlogPostProps = {
  post: ArticlePost;
};

const BlogPostPage = ({ post }: BlogPostProps) => {
  return (
    <>
      <Head>
        <title>{`${post?.meta.title} - CAN Trading`}</title>
        <meta property="og:title" content={post?.meta.title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={
            post?.meta.description ||
            "Trading & Risk Management Insights by CAN Trading"
          }
        />
        <meta
          property="og:url"
          content={`https://can-trading.com/blog/${post?.slug}`}
        />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.meta.title} />
        <meta
          name="twitter:description"
          content={
            post?.meta.description ||
            "Trading & Risk Management Insights by CAN Trading"
          }
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <main className="bg-background min-h-screen flex flex-col items-center">
        <ArticleElement
          article={post}
          backHref="/blog"
          backText="Trading and Risk Management"
          fallbackText="trading and risk management"
          fallbackHref="/blog"
        />
        <div className="px-4 w-full">
          <Banner />
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  try {
    const res = await getBlogPosts();

    const paths = res.data.map((post) => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async (
  context,
) => {
  const slug = context.params?.slug as string;

  try {
    const res = await getBlogPost(slug);
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

export default BlogPostPage;
