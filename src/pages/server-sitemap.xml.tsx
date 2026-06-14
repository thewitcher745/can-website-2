import { getServerSideSitemap } from "next-sitemap";
import { getAnalysisSlugs } from "@src/domains/analysis/api";
import { getBlogSlugs, getNewsSlugs } from "@src/domains/articles/api";
import { getHighPotentialSlugs } from "@src/domains/high-potential/api";

export const getServerSideProps = async (ctx: any) => {
  const [analysisSlugs, blogSlugs, newsSlugs, highPotentialSlugs] = await Promise.all([
    getAnalysisSlugs(),
    getBlogSlugs(),
    getNewsSlugs(),
    getHighPotentialSlugs(),
  ]);

  const fields = [] as any[];

  analysisSlugs.data.forEach((slug) => {
    fields.push({
      loc: `https://can-trading.com/analysis/${slug}`,
      lastmod: new Date().toISOString(),
    });
  });

  blogSlugs.data.forEach((slug) => {
    fields.push({
      loc: `https://can-trading.com/blog/${slug}`,
      lastmod: new Date().toISOString(),
    });
  });

  newsSlugs.data.forEach((slug) => {
    fields.push({
      loc: `https://can-trading.com/news/${slug}`,
      lastmod: new Date().toISOString(),
    });
  });

  highPotentialSlugs.data.forEach((slug) => {
    fields.push({
      loc: `https://can-trading.com/high-potential/${slug}`,
      lastmod: new Date().toISOString(),
    });
  });

  return getServerSideSitemap(ctx, fields);
};

const Sitemap = () => null;
export default Sitemap;
