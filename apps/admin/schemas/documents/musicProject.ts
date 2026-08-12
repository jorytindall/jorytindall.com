import { BiMusic } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
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
			validation: (Rule) => Rule.required().error('The project must have a title.'),
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			options: {
				source: `title`,
			},
			validation: (Rule) => Rule.required().error('The project must have a slug.'),
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
			validation: (Rule) => Rule.required().error('The project must have a description.'),
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
			validation: (Rule) => Rule.required().error('The project must have an image.'),
		},
		{
			name: `moduleContent`,
			type: `moduleContent`,
		},
	],
	preview: {
		select: {
			title: `title`,
			media: `image`,
		},
	}
});
