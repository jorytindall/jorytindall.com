import { BiBookContent } from 'react-icons/bi';

export default {
	name: `hero`,
	title: `Hero`,
	type: `object`,
	icon: BiBookContent,
	fields: [
		{
			name: `headline`,
			title: `Headline`,
			type: `string`,
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
		},
		{
			name: `actions`,
			title: `Actions`,
			type: `array`,
			of: [{ type: `button` }],
		},
		{
			name: `textAlignment`,
			title: `Text Alignment`,
			type: `string`,
			options: {
				list: [
					{ title: `Left`, value: `left` },
					{ title: `Center`, value: `center` },
					{ title: `Right`, value: `right` },
				],
				layout: `radio`,
				direction: `horizontal`,
			},
		},
		{
			name: `maxHeight`,
			title: `Maximum Height`,
			type: `boolean`,
			description: `Set the height of the hero to maximum for it to occupy 100% of the height and width of the browser.`,
		},
	],
};
