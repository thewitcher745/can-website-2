/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components/*': path.resolve(__dirname, './src/components/*'),
      '@styles/*': path.resolve(__dirname, './src/styles/*'),
      '@src/*': path.resolve(__dirname, './src/*'),
      '@features': path.resolve(__dirname, './src/features'),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alternative.me",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "static.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.tradingview.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
