/**
 * Where the Studio sends previews.
 *
 * `SANITY_STUDIO_*` variables are inlined into the Studio bundle at build time, which is
 * public — so only non-secret values belong here. The secret that actually unlocks draft
 * mode is minted per click against the dataset by the signed-in editor, never stored.
 */
const DEFAULT_PREVIEW_URL = 'https://jorytindall.com';

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '');

/**
 * The site previews open against. Point this at the Railway staging service once it
 * exists; it falls back to production so preview still works if the variable is unset.
 */
export const PREVIEW_URL = stripTrailingSlash(
	process.env.SANITY_STUDIO_PREVIEW_URL || DEFAULT_PREVIEW_URL,
);

/** The route on the site that validates the secret and turns Next's draft mode on. */
export const DRAFT_MODE_ENABLE_ROUTE = '/api/draft/enable';

/**
 * Origins the Presentation tool will load in its iframe. An editor can switch the
 * preview target between these; anything not listed is refused.
 */
export const ALLOWED_PREVIEW_ORIGINS = Array.from(
	new Set(
		[
			PREVIEW_URL,
			DEFAULT_PREVIEW_URL,
			'http://localhost:3000',
			...(process.env.SANITY_STUDIO_PREVIEW_ORIGINS || '').split(','),
		]
			.map((origin) => stripTrailingSlash(origin.trim()))
			.filter(Boolean),
	),
);
