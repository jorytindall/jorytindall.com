export default {
	name: `button`,
	title: `Button`,
	type: `object`,
	fields: [
		{
			name: `text`,
			title: `Text`,
			type: `string`,
		},
		{
			name: `buttonType`,
			title: `Button Type`,
			type: `string`,
			options: {
				list: [
					{ title: `Primary`, value: `primary` },
					{ title: `Secondary`, value: `secondary` },
				],
			},
		},
		{
			name: `action`,
			title: `Action`,
			type: `reference`,
			to: [
				{ type: `page` },
				{ type: `musicProject` },
				{ type: `portfolioProject` },
				{ type: `post` },
				{ type: `person` },
				{ type: `landingPage` },
			],
		},
		{
			name: `alignment`,
			title: `Alignment`,
			type: `string`,
			options: {
				list: [
					{ title: `Left`, value: `left` },
					{ title: `Center`, value: `center` },
					{ title: `Right`, value: `right` },
				],
			},
		},
	],
};
