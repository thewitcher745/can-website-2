import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { buildApiUrl } from "@src/config";
import Footer from "@src/shared/ui/Footer";
import { HighPotentialPost, ListedHighPotentialArticle } from "@src/types";
import ArticleElement from "@src/features/high-potential/ArticleElement";

type HighPotentialPostPageProps = { article: HighPotentialPost };

const HighPotentialPostPage: React.FC<HighPotentialPostPageProps> = ({
  article,
}) => {
  return (
    <>
      ""
      <main className="bg-background min-h-screen">
        <section className="w-full flex justify-center pt-6">
          <div className="max-w-custom flex flex-col w-full px-4 gap-4">
            <Link href="/" className="text-primary hover:underline text-sm">
              ← Back to Homepage
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col  gap-2 w-full lg:w-1/4">
                <div className="flex flex-wrap gap-4 rounded-xl border border-text-muted p-2 items-center justify-center sm:justify-start lg:justify-center 2xl:justify-between">
                  <div
                    className={`w-20 h-20 rounded-full border-6 border-${article.meta.category} aspect-square overflow-hidden`}
                  >
                    <img
                      src={article.meta.logo}
                      alt={article.meta.title}
                      className="size-full object-fit shadow-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-2">
                    <div className="flex gap-4 items-center justify-between">
                      <span className="text-text-muted">Token name:</span>
                      <span className="text-text-main text-right text-xl">
                        {article.meta.title}
                      </span>
                    </div>
                    <div className="flex gap-4 items-center justify-between">
                      <span className="text-text-muted">Symbol:</span>
                      <span className="text-text-main text-xl">
                        {article.meta.symbol.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <img
                  src={article.meta.image}
                  alt={article.meta.title}
                  className="w-full object-contain rounded-xl"
                />
              </div>
              <div className="w-full lg:w-1/2 flex-grow">
                <ArticleElement article={article} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(buildApiUrl(`/api/high_potential_tokens`));
    if (!res.ok) throw new Error("Failed to fetch high potential token slugs");
    const data: ListedHighPotentialArticle[] = await res.json();
    const paths = (Array.isArray(data) ? data : []).map((post) => ({
      params: { slug: post.slug },
    }));
    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<
  HighPotentialPostPageProps
> = async (context) => {
  const slug = context.params?.slug as string;
  try {
    const res = await fetch(buildApiUrl(`/api/high_potential_tokens/${slug}`));
    if (!res.ok) return { notFound: true, revalidate: 60 };
    const data = await res.json();
    if (!data) return { notFound: true, revalidate: 60 };
    return { props: { article: data as HighPotentialPost }, revalidate: 86400 };
  } catch (e) {
    return { notFound: true, revalidate: 60 };
  }
};

export default HighPotentialPostPage;
