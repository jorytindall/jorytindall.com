import { unstable_cache } from 'next/cache';
import { GET_DEFAULT_RESUME, GET_RESUME_PATHS, GET_RESUMES } from 'lib/queries';
import { sanityClient } from 'lib/sanity/config';
import { createResumeResponder, type LoadedJson, type LoadedPdf } from './http';
import { renderResumePdf } from './pdf';
import { lastModified, RESUME_FORMAT_VERSION, toJsonResume } from './toJsonResume';
import type { ResumeQueryResult } from './types';

/**
 * Server-side loaders for the résumé routes, cached in the Next data cache under one tag.
 * The Sanity webhook (`app/api/revalidate/resume`) expires the tag on publish; otherwise
 * entries refresh daily. Caching the rendered PDF, not just the query, means a PDF is
 * rendered at most once per publish however often it is downloaded.
 */

export const RESUME_CACHE_TAG = 'resume';
const REVALIDATE_SECONDS = 60 * 60 * 24;
const SITE_URL = 'https://jorytindall.com';
const cacheOptions = { tags: [RESUME_CACHE_TAG], revalidate: REVALIDATE_SECONDS };

const loadSlugs = unstable_cache(
	async () => (await sanityClient.fetch<string[]>(GET_RESUME_PATHS)) ?? [],
	['resume-slugs'],
	cacheOptions,
);

const loadJson = unstable_cache(
	async (slug: string | null): Promise<LoadedJson | null> => {
		const result = slug
			? await sanityClient.fetch<ResumeQueryResult | null>(GET_RESUMES, { slug })
			: await sanityClient.fetch<ResumeQueryResult | null>(GET_DEFAULT_RESUME);
		if (!result?.slug || !result.profile) return null;
		return {
			slug: result.slug,
			lastModified: lastModified(result),
			json: toJsonResume(result, { canonical: `${SITE_URL}/resume/${result.slug}.json` }),
		};
	},
	['resume-json', RESUME_FORMAT_VERSION],
	cacheOptions,
);

// unstable_cache stores JSON, so the PDF travels through it as base64.
const loadPdfBase64 = unstable_cache(
	async (slug: string | null) => {
		const loaded = await loadJson(slug);
		if (!loaded) return null;
		const pdf = await renderResumePdf(loaded.json);
		const name = (loaded.json.basics.name ?? 'Resume').trim().replace(/\s+/g, '-');
		return {
			slug: loaded.slug,
			lastModified: loaded.lastModified,
			fileName: `${name}-Resume.pdf`,
			pdf: pdf.toString('base64'),
		};
	},
	['resume-pdf', RESUME_FORMAT_VERSION],
	cacheOptions,
);

async function loadPdf(slug: string | null): Promise<LoadedPdf | null> {
	const cached = await loadPdfBase64(slug);
	return cached ? { ...cached, pdf: Buffer.from(cached.pdf, 'base64') } : null;
}

export const resumeResponder = createResumeResponder(
	{ slugs: loadSlugs, json: loadJson, pdf: loadPdf },
	RESUME_FORMAT_VERSION,
);
