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
import ClosingPriceHistorySection from "@features/coin/ClosingPriceHistorySection";
import Footer from "@shared/ui/Footer";
import { buildApiUrl } from "@src/config";
import { AnalysisPost, CoinCMCInfo, CoinMetaInfo } from "@src/types";

type CoinPageProps = {
  symbol: string;
  meta: CoinMetaInfo | null;
  cmc: CoinCMCInfo | null;
  analysisPosts: AnalysisPost[];
  closingPricePeriod: number;
  closingPricePoints: { time: number; close: number }[] | null;
  closingPriceError?: string | null;
};

const CoinPage: NextPage<CoinPageProps> = ({
  symbol,
  meta,
  cmc,
  analysisPosts = [],
  closingPricePeriod,
  closingPricePoints,
  closingPriceError,
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
              <ClosingPriceHistorySection
                symbol={symbol}
                period={closingPricePeriod}
                points={closingPricePoints}
                error={closingPriceError}
              />
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

  const periodParam = ctx.query?.period;
  const parsedPeriod =
    typeof periodParam === "string" ? Number(periodParam) : undefined;
  const closingPricePeriod =
    parsedPeriod && [30, 90, 180, 365, 500].includes(parsedPeriod)
      ? parsedPeriod
      : 30;

  if (!symbolParam || typeof symbolParam !== "string") {
    return { notFound: true };
  }

  try {
    const [metaRes, cmcRes, chartRes] = await Promise.all([
      fetch(buildApiUrl(`/api/coin_info/meta?symbol=${symbolParam}`)),
      fetch(buildApiUrl(`/api/coin_info/cmc?symbol=${symbolParam}`)),
      fetch(
        buildApiUrl(
          `/api/coin_info/chart?symbol=${symbolParam}&period=${closingPricePeriod}`
        )
      ),
    ]);

    const meta = metaRes.ok ? ((await metaRes.json()) as CoinMetaInfo) : null;
    const cmc = cmcRes.ok ? ((await cmcRes.json()) as CoinCMCInfo) : null;
    let analysisPosts: AnalysisPost[] = [];
    let closingPricePoints: { time: number; close: number }[] | null = null;
    let closingPriceError: string | null = null;

    try {
      if (chartRes.ok) {
        const data = await chartRes.json();

        if (data && Array.isArray(data)) {
          closingPricePoints = data.map((p: any) => ({
            time: p.time,
            close: p.close,
          }));
        } else {
          closingPricePoints = [];
        }
      } 
      else {
        closingPriceError = "Oops! Something went wrong.";
      }
    } catch {
      closingPriceError = "Oops! Something went wrong.";
      closingPricePoints = null;
    }

    try {
      const analysisRes = await fetch(
        buildApiUrl(`/api/analysis/coin/${symbolParam}`)
      );
      if (analysisRes.ok) {
        const data = await analysisRes.json();
        if (Array.isArray(data)) {
          analysisPosts = data as AnalysisPost[];
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
        closingPricePeriod,
        closingPricePoints,
        closingPriceError,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default CoinPage;
