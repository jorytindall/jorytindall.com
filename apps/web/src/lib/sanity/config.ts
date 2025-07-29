import { createClient } from 'next-sanity';

// Configuration constants
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Configuration object
export const sanityConfig = {
	projectId,
	dataset,
	apiVersion,
	useCdn: process.env.NODE_ENV === 'production',
};

// Default client for general use
export const sanityClient = createClient({
	...sanityConfig,
	useCdn: true,
});

// Preview client with token for draft content
export const previewClient = createClient({
	...sanityConfig,
	useCdn: false,
	token: process.env.SANITY_API_TOKEN,
});

// Helper to get the appropriate client
export const getClient = (usePreview = false) =>
	usePreview ? previewClient : sanityClient;