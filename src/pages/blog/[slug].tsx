import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import Footer from "@shared/ui/Footer";
import ArticleElement from "@src/features/articles/slug/ArticleElement";
import Banner from "@src/features/homepage/components/promotions/BannerMini";
import { ArticlePost } from "@src/domains/articles/types";
import { getBlogPost, getBlogSlugs } from "@src/domains/articles/api";
import MetaTags from "@src/shared/MetaTags";

type BlogPostProps = {
  post?: ArticlePost;
};

const BlogPostPage = ({ post }: BlogPostProps) => {
  if (!post) {
    return (
      <>
        <Head>
          <title>Post Not Found - CAN Trading</title>
          <meta name="robots" content="noindex" />
        </Head>
        <main className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-error mb-4">404</h1>
            <p className="text-text-muted mb-6">
              This blog post couldn't be found or is no longer available.
            </p>
            <Link
              href="/blog"
              className="text-primary hover:underline text-sm inline-block"
            >
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MetaTags
        title={post.meta.title}
        description={post.meta.description}
        canonicalUrl={`https://can-trading.com/blog/${post.slug}`}
        image={post.meta.thumbnail}
        type="article"
        publishedTime={post.meta.publishedAt || ""}
        modifiedTime={post.meta.lastModifiedAt || ""}
        author={post.meta.author}
        tags={post.meta.tags}
      />
      <main className="bg-background min-h-screen flex flex-col items-center">
        <ArticleElement
          article={post}
          backHref="/blog"
          backText="CAN Magazine"
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
    const res = await getBlogSlugs();

    const paths = res.data.map((slug) => ({
      params: { slug },
    }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async (
  context
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
      props: {},
      revalidate: 10,
    };
  }
};

export default BlogPostPage;
