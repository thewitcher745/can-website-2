/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL('https://alternative.me/**'), new URL('http://static.photos/**'), new URL('https://s2.coinmarketcap.com/**')],
  },
};

module.exports = nextConfig;
