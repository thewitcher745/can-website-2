/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://alternative.me/**'), new URL('http://static.photos/**')],
  },
};

module.exports = nextConfig;
