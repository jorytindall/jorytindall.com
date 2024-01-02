import { BiMicrophone } from 'react-icons/bi';

export default {
	name: `talk`,
	title: `Talk`,
	type: `document`,
	icon: BiMicrophone,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			validation: (Rule: any) => {
				Rule.required().error(`The talk must have a title.`);
			},
		},
		{
			name: `slug`,
			type: `slug`,
			title: `Slug`,
			description: `Slug or URL of the talk.`,
			options: {
				source: `title`,
			},
			validation: (Rule: any) => [
				Rule.required().error(`The page must have a title.`),
			],
		},
		{
			name: `image`,
			type: `mainImage`,
			title: `Image`,
		},
		{
			name: `conference`,
			title: `Conference`,
			type: `string`,
			description: `Example: Reactathon 2023`,
		},
		{
			name: `conferenceLink`,
			title: `Conference Link`,
			type: `string`,
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
		},
		{
			name: `date`,
			title: `Date`,
			type: `date`,
		},
		{
			name: `link`,
			title: `Link`,
			type: `string`,
		},
		{
			name: `deck`,
			title: `Deck`,
			type: `string`,
		},
		{
			name: `moduleContent`,
			type: `moduleContent`,
		},
	],
	preview: {
		select: {
			title: 'conference',
			subtitle: 'title',
		},
	},
};
