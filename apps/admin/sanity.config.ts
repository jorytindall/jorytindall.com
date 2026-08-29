import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { defineLocations, presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
// import { dashboardTool, projectInfoWidget } from '@sanity/dashboard'
import { schemaTypes } from './schemas';
import { OpenPreviewAction } from './actions/OpenPreviewAction';
import { ALLOWED_PREVIEW_ORIGINS, DRAFT_MODE_ENABLE_ROUTE, PREVIEW_URL } from './previewConfig';
import { PREVIEWABLE_TYPES, resolvePreviewPath } from './utils/previewPath';

// Tells Presentation which URL on the site each document appears at, so opening a
// document offers the right page and editing one highlights it in the iframe. Built from
// the same map the "Open preview" action uses.
const locations = Object.fromEntries(
	PREVIEWABLE_TYPES.map((type) => [
		type,
		defineLocations({
			select: { title: 'title', slug: 'slug.current' },
			resolve: (doc) => {
				const href = resolvePreviewPath(type, doc?.slug);

				// A document with no slug yet has nowhere to be previewed. Saying so is
				// more useful than silently offering nothing.
				if (!href) {
					return { message: 'Add a slug to preview this document.' };
				}

				return { locations: [{ title: doc?.title || 'Untitled', href }] };
			},
		}),
	]),
);

export default defineConfig({
	name: 'default',
	title: 'Jory Tindall',

	projectId: 'j9ccckrc',
	dataset: 'production',

	plugins: [
		deskTool(),
		// Live preview of unpublished content, rendered by the real site in an iframe.
		presentationTool({
			previewUrl: {
				initial: PREVIEW_URL,
				previewMode: {
					enable: DRAFT_MODE_ENABLE_ROUTE,
					// Lets an editor hand a working preview link to someone without
					// Studio access. Off until switched on from inside the tool, and
					// revocable by switching it off again.
					shareAccess: true,
				},
			},
			allowOrigins: ALLOWED_PREVIEW_ORIGINS,
			resolve: { locations },
		}),
		visionTool(),
		// dashboardTool({
		//   widgets: [
		//     projectInfoWidget(),
		//   ]
		// })
	],

	document: {
		// Opens the document's page on the site in a new tab, with drafts visible. The
		// action removes itself for types that have no route.
		actions: (prev) => [OpenPreviewAction, ...prev],
	},

	schema: {
		types: schemaTypes,
	},
});
