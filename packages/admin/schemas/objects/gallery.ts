import { BiImages } from 'react-icons/bi';

export default {
	name: `gallery`,
	title: `Gallery`,
	type: `object`,
	icon: BiImages,
	description: `Gallery of images.`,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `A descriptive title for the gallery, could be about it's contents.`,
		},
		{
			name: `columns`,
			title: `Columns`,
			type: `number`,
			description: `Number of columns in the gallery. Will automatically shrink based on viewport.`,
		},
		{
			name: `images`,
			title: `Images`,
			type: `array`,
			of: [{ type: `mainImage` }],
		},
	],
	preview: {
		select: {
			title: `title`,
		},
	},
};
