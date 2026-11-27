import { createHash } from 'node:crypto';
import type { JsonResume } from './types';

/**
 * HTTP layer for the résumé routes. Pure: data comes in through `ResumeLoaders`, so the
 * routes can be tested without Sanity or the Next cache. The real loaders live in
 * `server.ts`.
 */

export type ResumeFormat = 'pdf' | 'json';

export type LoadedJson = { slug: string; json: JsonResume; lastModified: string };
export type LoadedPdf = { slug: string; pdf: Buffer; lastModified: string; fileName: string };

export type ResumeLoaders = {
	/** Slugs of every published variant. */
	slugs: () => Promise<string[]>;
	/** `null` slug means the default variant. Resolves to null when there is none. */
	json: (slug: string | null) => Promise<LoadedJson | null>;
	pdf: (slug: string | null) => Promise<LoadedPdf | null>;
};

/**
 * Browsers revalidate every time (cheap: the ETag usually answers 304). Shared caches may
 * hold a copy for an hour and serve it stale for a day while refreshing, so a publish in
 * Sanity reaches anyone behind a shared cache within the hour. There is no CDN in front of
 * the site today; the server-side cache is purged on publish by the Sanity webhook.
 */
export const CACHE_CONTROL = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** `design-engineer.pdf` → `{ slug: 'design-engineer', format: 'pdf' }`; null if malformed. */
export function parseResumeFile(file: string): { slug: string; format: ResumeFormat } | null {
	const match = /^(.+)\.(pdf|json)$/.exec(file);
	if (!match || !SLUG.test(match[1])) return null;
	return { slug: match[1], format: match[2] as ResumeFormat };
}

export function etagFor(slug: string, format: ResumeFormat, lastModified: string, version: string) {
	const hash = createHash('sha1')
		.update(`${slug}:${format}:${lastModified}:${version}`)
		.digest('base64url')
		.slice(0, 22);
	return `"${hash}"`;
}

function notModified(request: Request, etag: string) {
	const header = request.headers.get('if-none-match');
	return Boolean(
		header && header.split(',').some((tag) => tag.trim().replace(/^W\//, '') === etag),
	);
}

function notFound() {
	return new Response('Résumé not found', {
		status: 404,
		headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
	});
}

function serverError() {
	return new Response('The résumé could not be generated', {
		status: 500,
		headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
	});
}

export function createResumeResponder(loaders: ResumeLoaders, version: string) {
	function common(etag: string, lastModified: string) {
		return {
			ETag: etag,
			'Last-Modified': new Date(lastModified).toUTCString(),
			'Cache-Control': CACHE_CONTROL,
		};
	}

	async function json(slug: string | null, request: Request) {
		const loaded = await loaders.json(slug);
		if (!loaded) return notFound();
		const etag = etagFor(loaded.slug, 'json', loaded.lastModified, version);
		const headers = {
			...common(etag, loaded.lastModified),
			// Public data, meant to be read by other tools (the résumé MCP server, JT-63).
			'Access-Control-Allow-Origin': '*',
		};
		if (notModified(request, etag)) return new Response(null, { status: 304, headers });
		return new Response(JSON.stringify(loaded.json, null, 2), {
			headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' },
		});
	}

	async function pdf(slug: string | null, request: Request) {
		let loaded: LoadedPdf | null;
		try {
			loaded = await loaders.pdf(slug);
		} catch (error) {
			// Includes ResumeOverflowError: a variant that no longer fits on one page is a
			// content problem to fix in Sanity, so say so loudly in the logs.
			console.error(`[resume] PDF for "${slug ?? 'default'}" failed:`, error);
			return serverError();
		}
		if (!loaded) return notFound();
		const etag = etagFor(loaded.slug, 'pdf', loaded.lastModified, version);
		const headers = common(etag, loaded.lastModified);
		if (notModified(request, etag)) return new Response(null, { status: 304, headers });
		const download = new URL(request.url).searchParams.get('download') === '1';
		return new Response(new Uint8Array(loaded.pdf), {
			headers: {
				...headers,
				'Content-Type': 'application/pdf',
				'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="${loaded.fileName}"`,
			},
		});
	}

	/** `/resume/[file]` — a named variant. Unknown slugs 404 without touching Sanity. */
	async function file(fileParam: string, request: Request) {
		const parsed = parseResumeFile(fileParam);
		if (!parsed) return notFound();
		const known = await loaders.slugs();
		if (!known.includes(parsed.slug)) return notFound();
		return parsed.format === 'pdf' ? pdf(parsed.slug, request) : json(parsed.slug, request);
	}

	return { json, pdf, file };
}
