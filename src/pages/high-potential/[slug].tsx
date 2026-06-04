import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import Footer from "@src/shared/ui/Footer";
import ArticleElement from "@src/features/high-potential/ArticleElement";
import {
  getHighPotentialPost,
  getHighPotentialSlugs,
} from "@src/domains/high-potential/api";
import { HighPotentialPost } from "@src/domains/high-potential/types";
import MetaTags from "@src/shared/MetaTags";

type HighPotentialPostProps = { post?: HighPotentialPost };

const HighPotentialPostPage = ({ post }: HighPotentialPostProps) => {
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
              This high-potential analysis couldn't be found or is no longer
              available.
            </p>
            <Link
              href="/"
              className="text-primary hover:underline text-sm inline-block"
            >
              ← Back to Homepage
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
        canonicalUrl={`https://can-trading.com/high-potential/${post.slug}`}
        image={post.meta.image}
        type="article"
        publishedTime={post.meta.publishedAt || ""}
        modifiedTime={post.meta.lastModifiedAt || ""}
        author={post.meta.author}
        tags={post.meta.tags}
      />
      <main className="bg-background min-h-screen">
        <section className="w-full flex justify-center pt-6">
          <div className="max-w-custom flex flex-col w-full px-4 gap-4">
            <Link href="/" className="text-primary hover:underline text-sm">
              ← Back to Homepage
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full lg:w-1/4">
                <div className="flex flex-wrap gap-4 rounded-xl border border-text-muted p-2 items-center justify-center sm:justify-start lg:justify-center 2xl:justify-between">
                  <div
                    className={`w-20 h-20 rounded-full border-6 border-${post.meta.category} aspect-square overflow-hidden`}
                  >
                    <img
                      src={post.meta.logo}
                      alt={post.meta.title}
                      className="size-full object-fit shadow-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-2">
                    <div className="flex gap-4 items-center justify-between">
                      <span className="text-text-muted">Token name:</span>
                      <span className="text-text-main text-right text-xl">
                        {post.meta.title}
                      </span>
                    </div>
                    <div className="flex gap-4 items-center justify-between">
                      <span className="text-text-muted">Symbol:</span>
                      <span className="text-text-main text-xl">
                        {post.meta.symbol.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-64">
                  <Image
                    fill
                    src={post.meta.image}
                    alt={post.meta.title}
                    className="w-full object-contain rounded-xl"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex-grow">
                <ArticleElement article={post} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  try {
    const res = await getHighPotentialSlugs();

    const paths = res.data.map((slug) => ({
      params: { slug },
    }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<HighPotentialPostProps> = async (
  context,
) => {
  const slug = context.params?.slug as string;

  try {
    const res = await getHighPotentialPost(slug);
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

export default HighPotentialPostPage;
