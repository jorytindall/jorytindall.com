import { defineType } from 'sanity';

/**
 * A role as it appears in one résumé variant: a reference to the shared `experience`
 * document plus an optional tag filter that selects which of its highlights to show.
 */
export default defineType({
	name: `resumeExperienceEntry`,
	title: `Experience Entry`,
	type: `object`,
	fields: [
		{
			name: `experience`,
			title: `Experience`,
			type: `reference`,
			to: [{ type: `experience` }],
			validation: (Rule) => Rule.required().error(`Pick a role.`),
		},
		{
			name: `highlightTags`,
			title: `Highlight Tags`,
			type: `array`,
			description: `Show only highlights carrying at least one of these tags. Leave empty to show all of them.`,
			of: [{ type: `string` }],
			options: { layout: `tags` },
		},
		{
			name: `maxHighlights`,
			title: `Max Highlights`,
			type: `number`,
			description: `Optional cap for this variant, applied after tag filtering. Leave empty for no cap.`,
			validation: (Rule) => Rule.integer().min(1).max(6),
		},
	],
	preview: {
		select: {
			employer: `experience.employer`,
			title: `experience.title`,
			tags: `highlightTags`,
		},
		prepare({ employer, title, tags }) {
			const filter = Array.isArray(tags) && tags.length ? tags.join(', ') : 'all highlights';
			return {
				title: [title, employer].filter(Boolean).join(' · ') || 'Untitled role',
				subtitle: filter,
			};
		},
	},
});
