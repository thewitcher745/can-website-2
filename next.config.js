/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://alternative.me/**"),
      new URL("http://static.photos/**"),
      new URL("https://s2.coinmarketcap.com/**"),
      new URL("https://img.freepik.com/**"),
      new URL("https://www.tradingview.com/**"),
    ],
  },
};

module.exports = nextConfig;
