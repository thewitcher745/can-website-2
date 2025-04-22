const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// Ignore TypeScript errors during build
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	// Target serverless deployment (for Netlify)
	target: 'serverless',
	// Configure images for Netlify
	images: {
		loader: 'custom',
		disableStaticImages: false,
	},
}

module.exports = withBundleAnalyzer(nextConfig);
