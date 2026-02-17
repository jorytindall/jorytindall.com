import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
	api: {
		projectId: 'j9ccckrc',
		dataset: 'production',
	},
	vite: (prev) => ({
		...prev,
		preview: {
			...prev.preview,
			allowedHosts: ['admin.jorytindall.com', '.railway.app'],
		},
	}),
});
