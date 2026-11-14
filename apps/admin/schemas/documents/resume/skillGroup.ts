import { BiWrench } from 'react-icons/bi';
import { defineType } from 'sanity';

/** A named group of skills. Maps to a JSON Resume `skills[]` entry. */
export default defineType({
	name: `skillGroup`,
	title: `Skill Group`,
	type: `document`,
	icon: BiWrench,
	fields: [
		{
			name: `name`,
			title: `Name`,
			type: `string`,
			description: `Example: Design, Engineering, Tools.`,
			validation: (Rule) => Rule.required().error(`Name the group.`),
		},
		{
			name: `items`,
			title: `Items`,
			type: `array`,
			of: [{ type: `string` }],
			options: { layout: `tags` },
			validation: (Rule) => Rule.required().min(1).error(`Add at least one skill.`),
		},
	],
	preview: {
		select: {
			title: `name`,
			items: `items`,
		},
		prepare({ title, items }) {
			return {
				title,
				subtitle: Array.isArray(items) ? items.join(', ') : undefined,
			};
		},
	},
});
