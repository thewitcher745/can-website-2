// 1. IMPORT THE LEGACY FUNCTION FOR PAGES ROUTER
import { getServerSideSitemapLegacy, ISitemapField } from "next-sitemap";
import { getAnalysisSlugs } from "@src/domains/analysis/api";
import { getBlogSlugs, getNewsSlugs } from "@src/domains/articles/api";
import { getHighPotentialSlugs } from "@src/domains/high-potential/api";

export const getServerSideProps = async (ctx: any) => {
  const fields: ISitemapField[] = [];
  const fallbackDate = new Date().toISOString();

  try {
    const [analysisSlugs, blogSlugs, newsSlugs, highPotentialSlugs] =
      await Promise.all([
        getAnalysisSlugs().catch((err) => {
          console.error("Analysis API Error:", err);
          return { data: [] };
        }),
        getBlogSlugs().catch((err) => {
          console.error("Blog API Error:", err);
          return { data: [] };
        }),
        getNewsSlugs().catch((err) => {
          console.error("News API Error:", err);
          return { data: [] };
        }),
        getHighPotentialSlugs().catch((err) => {
          console.error("HighPotential API Error:", err);
          return { data: [] };
        }),
      ]);

    const addFields = (slugs: string[] | undefined, path: string) => {
      if (!slugs || !Array.isArray(slugs)) return;
      slugs.forEach((slug) => {
        fields.push({
          loc: `https://can-trading.com/${path}/${slug}`,
          lastmod: fallbackDate,
        });
      });
    };

    addFields(analysisSlugs?.data, "analysis");
    addFields(blogSlugs?.data, "blog");
    addFields(newsSlugs?.data, "news");
    addFields(highPotentialSlugs?.data, "high-potential");
  } catch (globalError) {
    console.error("Critical Sitemap Crash:", globalError);
    return getServerSideSitemapLegacy(ctx, []);
  }

  // Set headers so it renders as XML instead of HTML text
  ctx.res.setHeader("Content-Type", "application/xml");
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=59",
  );

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function SitemapPage() {
  return null;
}
