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
		},
		{
			name: `caption`,
			title: `Caption`,
			type: `string`,
		},
	],
	preview: {
		select: {
			title: 'alternativeText',
		},
	},
};
