import { defineType } from 'sanity';

/**
 * One bullet under a role. Tags let a résumé variant pull only the highlights relevant to
 * it (for example `design` or `engineering`) without duplicating the role.
 */
export default defineType({
	name: `resumeHighlight`,
	title: `Highlight`,
	type: `object`,
	fields: [
		{
			name: `text`,
			title: `Text`,
			type: `text`,
			rows: 2,
			validation: (Rule) => [
				Rule.required().error(`A highlight needs text.`),
				Rule.max(280).warning(`Long bullets eat into the one-page budget.`),
			],
		},
		{
			name: `tags`,
			title: `Tags`,
			type: `array`,
			description: `Used by résumé variants to select highlights. Lowercase, e.g. design, engineering.`,
			of: [{ type: `string` }],
			options: { layout: `tags` },
		},
	],
	preview: {
		select: {
			title: `text`,
			tags: `tags`,
		},
		prepare({ title, tags }) {
			return {
				title,
				subtitle: Array.isArray(tags) && tags.length ? tags.join(', ') : undefined,
			};
		},
	},
});
