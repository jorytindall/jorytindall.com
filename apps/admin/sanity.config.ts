import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
// import { dashboardTool, projectInfoWidget } from '@sanity/dashboard'
import { schemaTypes } from './schemas';

export default defineConfig({
	name: 'default',
	title: 'Jory Tindall',

	projectId: 'j9ccckrc',
	dataset: 'production',

	plugins: [
		deskTool(),
		visionTool(),
		// dashboardTool({
		//   widgets: [
		//     projectInfoWidget(),
		//   ]
		// })
	],

	schema: {
		types: schemaTypes,
	},
});
