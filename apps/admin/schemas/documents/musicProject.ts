import { BiMusic } from 'react-icons/bi';

export default {
	name: `musicProject`,
	title: `Music Project`,
	type: `document`,
	icon: BiMusic,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title of the music project.`,
			validation: (Rule: any) => {
				Rule.required().error('The project must have a title.');
			},
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			options: {
				source: `title`,
			},
			validation: (Rule: any) => {
				Rule.required().error('The project must have a slug.');
			},
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
			validation: (Rule: any) => {
				Rule.required().error('The project must have a descrtiption.');
			},
		},
		{
			name: 'pressKit',
			title: 'Press kit',
			type: 'fileDownload',
		},
		{
			name: `musicians`,
			title: `Musicians`,
			type: `array`,
			of: [
				{
					name: `musician`,
					title: `Musician`,
					type: `reference`,
					to: { type: `person` },
				},
			],
		},
		{
			name: 'image',
			title: 'Image',
			type: 'mainImage',
			validation: (Rule: any) => {
				Rule.required().error('The project must have an image.');
			},
		},
		{
			name: `moduleContent`,
			type: `moduleContent`,
		},
	],
};
