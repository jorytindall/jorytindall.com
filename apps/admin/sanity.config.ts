import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
// import { dashboardTool, projectInfoWidget } from '@sanity/dashboard'
import { schemaTypes } from './schemas';
import { SINGLETON_TYPES, structure } from './structure';

export default defineConfig({
	name: 'default',
	title: 'Jory Tindall',

	projectId: 'j9ccckrc',
	dataset: 'production',

	plugins: [
		structureTool({ structure }),
		visionTool(),
		// dashboardTool({
		//   widgets: [
		//     projectInfoWidget(),
		//   ]
		// })
	],

	schema: {
		types: schemaTypes,
		// Singletons are opened from the desk structure, never created from "New document".
		templates: (templates) =>
			templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
	},

	document: {
		// Singletons cannot be duplicated, deleted or unpublished.
		actions: (actions, { schemaType }) =>
			SINGLETON_TYPES.has(schemaType)
				? actions.filter(
						({ action }) =>
							action === 'publish' ||
							action === 'discardChanges' ||
							action === 'restore',
					)
				: actions,
	},
});
