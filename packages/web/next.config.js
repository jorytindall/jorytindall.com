/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: [
			'cdn.sanity.io',
		]
	}
};

module.exports = nextConfig;
