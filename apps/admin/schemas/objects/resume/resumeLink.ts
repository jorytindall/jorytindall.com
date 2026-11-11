import { defineType } from 'sanity';

/** A profile link on the résumé. Maps to a JSON Resume `basics.profiles[]` entry. */
export default defineType({
	name: `resumeLink`,
	title: `Résumé Link`,
	type: `object`,
	fields: [
		{
			name: `network`,
			title: `Network`,
			type: `string`,
			description: `Example: LinkedIn, GitHub, Portfolio.`,
			validation: (Rule) => Rule.required().error(`Name the network or site.`),
		},
		{
			name: `username`,
			title: `Username`,
			type: `string`,
			description: `Optional handle shown alongside the network.`,
		},
		{
			name: `url`,
			title: `URL`,
			type: `url`,
			validation: (Rule) => Rule.required().error(`A link needs a URL.`),
		},
	],
	preview: {
		select: {
			title: `network`,
			subtitle: `url`,
		},
	},
});
