import { cookies, draftMode } from 'next/headers';
import type { ClientPerspective, QueryParams } from 'next-sanity';
import { draftClient, sanityClient } from './config';

// Written by `defineEnableDraftMode` alongside Next's own `__prerender_bypass` cookie.
// Presentation uses it to tell the site which perspective the editor is looking at, so
// toggling "Published"/"Drafts" in the Studio changes what the preview renders.
// Mirrors `perspectiveCookieName` from `@sanity/preview-url-secret/constants`, which is
// a transitive dependency here and so not imported directly.
const PERSPECTIVE_COOKIE = 'sanity-preview-perspective';

// The cookie is attacker-influenced in principle, so it is matched against a list
// rather than passed through. `raw` is deliberately absent: it would return both the
// draft and the published copy of every document and duplicate content on the page.
const ALLOWED_PERSPECTIVES: ClientPerspective[] = ['drafts', 'published'];

const resolvePerspective = async (): Promise<ClientPerspective> => {
	const cookieStore = await cookies();
	const requested = cookieStore.get(PERSPECTIVE_COOKIE)?.value as ClientPerspective;

	return ALLOWED_PERSPECTIVES.includes(requested) ? requested : 'drafts';
};

interface SanityFetchOptions {
	/**
	 * Whether a draft response carries stega encoding — invisible characters appended to
	 * every string that tell the visual editing overlay which field produced it.
	 *
	 * Leave it on for content that gets rendered, which is what makes click-to-edit
	 * work. Turn it off for values that are not visible text, such as anything going
	 * into `generateMetadata`: the encoding would end up inside the `<title>` and any
	 * `og:` tag, where it cannot be clicked and only corrupts the string.
	 */
	stega?: boolean;
}

/**
 * The single entry point for reading Sanity content.
 *
 * Outside draft mode this is the published, CDN-backed client, so routes keep their
 * `revalidate` behaviour — reading `draftMode().isEnabled` does not opt a route into
 * dynamic rendering, it just returns `false` while prerendering.
 *
 * Do NOT call this from `generateStaticParams`. That runs at build time with no request,
 * and `draftMode()` throws there. Those functions use `sanityClient` directly.
 */
export async function sanityFetch<T = any>(
	query: string,
	params: QueryParams = {},
	{ stega = true }: SanityFetchOptions = {},
): Promise<T> {
	const { isEnabled } = await draftMode();

	if (!isEnabled) {
		return sanityClient.fetch<T>(query, params);
	}

	if (!process.env.SANITY_API_TOKEN) {
		throw new Error(
			'Draft mode is enabled but SANITY_API_TOKEN is not set, so drafts cannot be read. ' +
				'Add it in Infisical (or the Railway service) and restart.',
		);
	}

	return draftClient.fetch<T>(query, params, {
		perspective: await resolvePerspective(),
		// Drafts change while the editor is typing; a cached response defeats the point.
		useCdn: false,
		cache: 'no-store',
		stega,
	});
}
