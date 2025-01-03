/** @type {import('next').NextConfig} */
// import createMDX from '@next/mdx';

const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
		],
	},
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
};

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(withMDX(nextConfig));
