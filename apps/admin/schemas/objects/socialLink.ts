export default {
	name: `socialLink`,
	title: `Social Link`,
	type: `object`,
	fields: [
		{
			name: `platform`,
			title: `Platform`,
			type: `string`,
			description: `Select a social platform type.`,
			options: {
				list: [
					{ title: `Facebook`, value: `facebook` },
					{ title: `Instagram`, value: `instagram` },
					{ title: `LinkedIn`, value: `linkedIn` },
					{ title: `Twitter`, value: `twitter` },
					{ title: `YouTube`, value: `youTube` },
					{ title: `TikTok`, value: `tiktok` },
					{ title: `Behance`, value: `behance` },
					{ title: `Dribbble`, value: `dribbble` },
					{ title: `GitHub`, value: `github` },
				],
				layout: `dropdown`,
			},
		},
		{
			name: 'text',
			type: 'string',
			title: 'Text',
			description: 'Text to display for the social link.'
		},
		{
			name: `link`,
			title: `Link`,
			type: `url`,
			description: `Link to the social account.`,
		},
	],
	preview: {
		select: {
			title: `platform`,
			subtitle: `link`,
		},
	},
};
