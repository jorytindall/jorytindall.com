import { createClient } from 'next-sanity';

// Configuration constants
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Where the Studio lives. Draft-mode responses are stega-encoded with this URL so the
// visual editing overlay can deep-link each string back to the field that produced it.
export const studioUrl =
	process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://admin.jorytindall.com';

// Configuration object
export const sanityConfig = {
	projectId,
	dataset,
	apiVersion,
	useCdn: process.env.NODE_ENV === 'production',
};

// Default client for general use. `published` is already what an untokened client gets
// back — the API cannot return drafts without credentials — but stating it means the
// perspective does not silently widen if a token is ever added here.
export const sanityClient = createClient({
	...sanityConfig,
	useCdn: true,
	perspective: 'published',
});

// Draft-aware client. Only ever reached through `sanityFetch` with Next's draft mode
// enabled, and only server-side — the token must never reach the browser.
export const draftClient = sanityClient.withConfig({
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
	perspective: 'drafts',
	stega: { studioUrl, enabled: true },
});

// Used solely to validate the signed secret on a preview URL against the dataset.
// No stega: this client never renders content.
export const previewSecretClient = sanityClient.withConfig({
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
});
