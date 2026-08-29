/**
 * Maps a Sanity document to the route on the website that renders it.
 *
 * This is the one place that knows the mapping, and both preview entry points use it —
 * the Presentation tool's location resolver and the "Open preview" document action — so
 * they can never disagree about where a document lives.
 *
 * Only the types listed here have a route in `apps/web/src/app/(pages)/`. Deliberately
 * absent:
 *
 * - `homePage`, because `(home)/page.tsx` renders fixed sections plus upcoming events
 *   and never reads the document, so previewing it would show a page its content has no
 *   effect on.
 * - `landingPage`, which has a GROQ query but no route at all.
 *
 * Note that `utils/linkResolver.ts` in `apps/web` is a similar-looking map that cannot
 * be reused here: it is keyed partly on route names rather than document types (it has
 * `speaking`, but the document type is `talk`), so a talk would resolve to `/{slug}`.
 */
const ROUTE_PREFIXES = {
	page: '',
	post: 'blog',
	portfolioProject: 'portfolio',
	event: 'events',
	musicProject: 'music',
	talk: 'speaking',
} as const;

export type PreviewableType = keyof typeof ROUTE_PREFIXES;

export const PREVIEWABLE_TYPES = Object.keys(ROUTE_PREFIXES) as PreviewableType[];

export const isPreviewableType = (type: string): type is PreviewableType =>
	Object.prototype.hasOwnProperty.call(ROUTE_PREFIXES, type);

/**
 * Returns the site path for a document, or `null` when it cannot be previewed — an
 * unsupported type, or a document that has no slug yet.
 */
export const resolvePreviewPath = (type: string, slug?: string | null): string | null => {
	if (!isPreviewableType(type) || !slug) {
		return null;
	}

	const prefix = ROUTE_PREFIXES[type];

	return prefix ? `/${prefix}/${slug}` : `/${slug}`;
};
