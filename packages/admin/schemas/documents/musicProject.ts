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
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			options: {
				source: `title`,
			},
		},
		{
			name: `author`,
			title: `Author`,
			type: `reference`,
			to: [{ type: `person` }],
		},
		{
			name: `moduleContent`,
			type: `moduleContent`,
		},
	],
};
