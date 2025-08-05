/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://alternative.me/**')],
  },
};

module.exports = nextConfig;
