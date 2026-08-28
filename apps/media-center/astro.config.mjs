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
		// `checkOrigin` is back on (it is Astro's default) — the whole app is behind auth
		// with `sameSite: 'lax'` cookies, and /login is a real form POST, so the CSRF
		// origin check is worth having.
		//
		// It only works with `allowedDomains` set. Railway terminates TLS and proxies to
		// this app over plain HTTP, so Astro rebuilds the request URL from `Host` and
		// `X-Forwarded-Proto`. Since Astro 5.14 it only trusts those headers for hosts
		// listed here; with an empty list the host falls back to `localhost`, making
		// `Astro.url.origin` `https://localhost` and 403-ing every login POST. That is
		// almost certainly why the check was switched off in the first place.
		allowedDomains: [
			{ protocol: 'https', hostname: 'jorytindall.tv' },
			// Railway's generated service domain, used before the custom domain resolves.
			{ protocol: 'https', hostname: '**.up.railway.app' },
		],
	},
});
