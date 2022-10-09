export default {
	widgets: [
		{
			name: `netlify`,
			options: {
				title: `Netlify Deploys`,
				sites: [
					{
						title: `Website`,
						apiId: `8705df16-5468-408c-9022-f5de5b55194b`,
						buildHookId: `5ff365e471ed1b010325d77e`,
						name: `jorytindall`,
					},
					{
						title: `Sanity Studio`,
						apiId: `5aaf7d5a-1cdd-4ae2-871b-1c25b63d39ed`,
						buildHookId: `5ff365202d7dbf00bad0871e`,
						name: `jorytindall-admin`,
					},
				],
			},
		},
		{
			name: `project-info`,
			layout: {
				width: `medium`,
				height: `auto`,
			},
		},
		{
			name: `document-list`,
			options: {
				title: `Last Edited`,
				order: `_updatedAd desc`,
				types: [
					`page`,
					`landingPage`,
					`musicProject`,
					`portfolioProject`,
					`post`,
				],
				limit: 6,
			},
		},
	],
};
