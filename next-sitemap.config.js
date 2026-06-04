/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.URL || "https://can-trading.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ["/server-sitemap.xml", "/admin/*", "/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      `${process.env.URL || "https://can-trading.com"}/server-sitemap.xml`,
    ],
  },
  outDir: "public",
};
