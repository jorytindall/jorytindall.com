import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

export default defineConfig({
	output: 'server',
	integrations: [mdx()],
	adapter: node({
		mode: 'standalone',
	}),
	server: {
		host: '0.0.0.0',
	},
	security: {
		checkOrigin: false,
	},
});
