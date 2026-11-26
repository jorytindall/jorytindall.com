/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	// Load react-pdf from node_modules at runtime instead of bundling it: it is a Node-only
	// renderer (fonts from disk, Buffer output) and does not need to go through webpack.
	serverExternalPackages: ['@react-pdf/renderer'],
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
			{
				protocol: 'https',
				hostname: 'i.scdn.co',
			},
		],
	},
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
