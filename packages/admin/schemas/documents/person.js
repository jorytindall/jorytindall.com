import { BiUserCircle } from 'react-icons/bi';

export default {
	name: `person`,
	title: `Person`,
	type: `document`,
	icon: BiUserCircle,
	fields: [
		{
			name: `name`,
			title: `Name`,
			type: `string`,
		},
		{
			name: `image`,
			title: `Image`,
			type: `mainImage`,
		},
	],
	preview: {
		select: {
			title: `name`,
			media: `image`,
		},
	},
};
