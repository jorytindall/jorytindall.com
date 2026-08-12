export default {
	name: `portfolioListItem`,
	title: `Portfolio List Item`,
	type: `object`,
	fields: [
		{
			name: `item`,
			title: `Item`,
			type: `reference`,
			description: `Chapters of a larger program are excluded; they appear on their parent project's page instead.`,
			to: [{ type: `portfolioProject` }],
			options: {
				filter: `!defined(parentProject)`,
			},
		},
	],
	preview: {
		select: {
			title: `item.title`,
			subtitle: `item.client`,
			media: `item.featuredImage`,
		},
	},
};
