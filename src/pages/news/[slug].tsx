import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import Footer from "@shared/ui/Footer";
import ArticleElement from "@src/features/articles/slug/ArticleElement";
import Banner from "@src/features/homepage/components/promotions/BannerMini";
import { ArticlePost } from "@src/domains/articles/types";
import { getNewsPost, getNewsPosts } from "@src/domains/articles/api";

type NewsPostProps = {
  post: ArticlePost;
};

const NewsPostPage = ({ post }: NewsPostProps) => {
  return (
    <>
      <Head>
        <title>{`${post?.meta.title} - CAN Trading`}</title>
        <meta property="og:title" content={post?.meta.title} />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={post?.meta.description || "Crypto news by CAN Trading"}
        />
        <meta
          property="og:url"
          content={`https://can-trading.com/news/${post?.slug}`}
        />
        <meta property="og:site_name" content="CAN Trading" />
        <meta property="og:image" content="/images/showcase/can-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.meta.title} />
        <meta
          name="twitter:description"
          content={post?.meta.description || "Crypto news by CAN Trading"}
        />
        <meta name="twitter:image" content="/images/showcase/can-banner.png" />
      </Head>
      <main className="bg-background min-h-screen flex flex-col items-center">
        <ArticleElement
          article={post}
          backHref="/news"
          backText="News"
          fallbackText="news"
          fallbackHref="/news"
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
    const res = await getNewsPosts();

    const paths = res.data.map((post) => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<NewsPostProps> = async (
  context,
) => {
  const slug = context.params?.slug as string;

  try {
    const res = await getNewsPost(slug);
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

export default NewsPostPage;
