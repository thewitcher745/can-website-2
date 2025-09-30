import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

import { buildApiUrl } from "@src/config";
import Footer from "@src/shared/ui/Footer";
import Navbar from "@shared/ui/navbar/Navbar";
import { HighPotentialTokenMeta } from "@src/types";

interface TokenPageData extends HighPotentialTokenMeta {
  content_html: string;
  image: string;
}

export default function HighPotentialTokenPage() {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  const [tokenData, setTokenData] = useState<TokenPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(buildApiUrl(`/api/high_potential_tokens/${slug}`))
      .then((res) => {
        if (!res.ok)
          throw new Error("Failed to fetch high potential token data.");
        return res.json();
      })
      .then(setTokenData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Head>
          <title>CAN Trading</title>
        </Head>
        <Navbar />
        <main className="pt-20 bg-background min-h-screen">
          <section id="videos" className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 text-white">
                Loading token data...
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>CAN Trading</title>
        </Head>
        <Navbar />
        <main className="pt-20 bg-background min-h-screen">
          <section id="videos" className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 text-red-500">{error}</div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!tokenData) {
    return (
      <>
        <Head>
          <title>CAN Trading</title>
        </Head>
        <Navbar />
        <main className="pt-20 bg-background min-h-screen">
          <section id="videos" className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 text-white">
                No videos found.
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <main className="pt-20 bg-background min-h-screen">
        <section className="w-full flex justify-center">
          <div className="2xl:max-w-[100rem] xl:max-w-7xl max-w-6xl flex lg:flex-row flex-col w-full px-4 gap-4">
            <div className="flex flex-col gap-2 w-full lg:w-1/4">
              <div className="flex flex-wrap gap-4 rounded-xl border border-text-muted p-2 items-center justify-center sm:justify-start lg:justify-center 2xl:justify-between">
                <div
                  className={`w-20 h-20 rounded-full border-6 border-${tokenData.category} aspect-square overflow-hidden`}
                >
                  <img
                    src={tokenData.logo}
                    alt={tokenData.name}
                    className="size-full object-fit shadow-lg"
                  />
                </div>
                <div className="flex flex-col gap-4 p-2">
                  <div className="flex gap-4 items-center justify-between">
                    <span className="text-text-muted">Token name:</span>
                    <span className="text-text-main text-right text-xl">
                      {tokenData.name}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center justify-between">
                    <span className="text-text-muted">Symbol:</span>
                    <span className="text-text-main text-xl">
                      {tokenData.symbol.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <img
                src={tokenData.image}
                alt={tokenData.name}
                className="w-full object-contain rounded-xl"
              />
            </div>
            <div className="w-full lg:w-1/2 flex-grow">
              <article
                className="high-potential-article text-text-main"
                dangerouslySetInnerHTML={{ __html: tokenData.content_html }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
