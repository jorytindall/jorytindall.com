import { BiImageAlt } from 'react-icons/bi';

export default {
	name: `mainImage`,
	title: `Image`,
	type: `image`,
	icon: BiImageAlt,
	options: {
		hotspot: true,
	},
	fields: [
		{
			name: `alternativeText`,
			title: `Alternative Text`,
			type: `string`,
			options: {
				isHighlighted: true,
			},
		},
		{
			name: `caption`,
			title: `Caption`,
			type: `string`,
			options: {
				isHighlighted: true,
			},
		},
	],
	preview: {
		select: {
			title: 'alternativeText',
		},
	},
};
