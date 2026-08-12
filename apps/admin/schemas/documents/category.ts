import { BiPurchaseTag } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: `category`,
	title: `Category`,
	type: `document`,
	icon: BiPurchaseTag,
	fields: [
		{
			name: `name`,
			title: `Name`,
			type: `string`,
			description: `Name of the category.`,
			validation: (Rule) => Rule.required().error(`The category must have a name.`),
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			description: `Generate from the name.`,
			validation: (Rule) => Rule.required().error(`The category must have a slug.`),
			options: {
				source: `name`,
			},
		},
	],
});
