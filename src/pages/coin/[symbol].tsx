import React from "react";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";

import CoinNotFound from "@features/coin/CoinNotFound";
import CoinOverviewSection from "@features/coin/CoinOverviewSection";
import CoinPageHeader from "@features/coin/CoinPageHeader";
import KeyMetricsSection from "@features/coin/KeyMetricsSection";
import OfficialLinksSection from "@features/coin/OfficialLinksSection";
import TechnicalAnalysisSection from "@features/coin/TechnicalAnalysisSection";
import CoinDescriptionSection from "@features/coin/CoinDescriptionSection";
import Footer from "@shared/ui/Footer";
import { buildApiUrl } from "@src/config";
import { AnalysisPostMeta, CoinCMCInfo, CoinMetaInfo } from "@src/types";

type CoinPageProps = {
  symbol: string;
  meta: CoinMetaInfo | null;
  cmc: CoinCMCInfo | null;
  analysisPosts: AnalysisPostMeta[];
};

const CoinPage: NextPage<CoinPageProps> = ({
  symbol,
  meta,
  cmc,
  analysisPosts = [],
}) => {
  if (!meta && !cmc) {
    return (
      <>
        <Head>
          <title>Coin not found - CAN Trading</title>
        </Head>
        <CoinNotFound symbol={symbol} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${
          meta?.name ?? symbol
        } (${symbol.toUpperCase()}) - CAN Trading`}</title>
        <meta
          name="description"
          content={
            meta?.description
              ? meta.description.slice(0, 150)
              : `${meta?.name ?? symbol} coin details and metrics`
          }
        />
      </Head>
      <main className="bg-background text-text-main min-h-screen">
        <div className="max-w-custom mx-auto px-4 py-10 space-y-8">
          <CoinPageHeader symbol={symbol} meta={meta} />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 flex flex-col gap-6">
              <CoinOverviewSection symbol={symbol} meta={meta} cmc={cmc} />
              <KeyMetricsSection cmc={cmc} />
              <OfficialLinksSection meta={meta} />
            </div>
            <div className="lg:flex-1 flex flex-col gap-6">
              <CoinDescriptionSection meta={meta} />
              <TechnicalAnalysisSection
                symbol={symbol}
                analysisPosts={analysisPosts}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CoinPageProps> = async (
  ctx
) => {
  const symbolParam = ctx.params?.symbol;

  if (!symbolParam || typeof symbolParam !== "string") {
    return { notFound: true };
  }

  try {
    const [metaRes, cmcRes] = await Promise.all([
      fetch(buildApiUrl(`/api/coin_info/meta?symbol=${symbolParam}`)),
      fetch(buildApiUrl(`/api/coin_info/cmc?symbol=${symbolParam}`)),
    ]);

    const meta = metaRes.ok ? ((await metaRes.json()) as CoinMetaInfo) : null;
    const cmc = cmcRes.ok ? ((await cmcRes.json()) as CoinCMCInfo) : null;
    let analysisPosts: AnalysisPostMeta[] = [];

    try {
      const analysisRes = await fetch(
        buildApiUrl(`/api/analysis/coin/${symbolParam}`)
      );
      if (analysisRes.ok) {
        const data = await analysisRes.json();
        if (Array.isArray(data)) {
          analysisPosts = data as AnalysisPostMeta[];
        }
      }
    } catch {
      analysisPosts = [];
    }

    if (!meta && !cmc) {
      return { notFound: true };
    }

    return {
      props: {
        symbol: symbolParam.toUpperCase(),
        meta,
        cmc,
        analysisPosts,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default CoinPage;
