import { BiFile } from 'react-icons/bi';
import { defineType } from 'sanity';

const API_VERSION = '2024-01-01';

/**
 * A résumé variant (General, Design, Design Engineer, …). Assembles the shared profile,
 * roles, skills and education into one document, served at `/resume/[slug].pdf` and
 * `/resume/[slug].json`. Exactly one variant is the default, served at `/resume.pdf`.
 */
export default defineType({
	name: `resume`,
	title: `Résumé Variant`,
	type: `document`,
	icon: BiFile,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Internal name, e.g. Design Engineer.`,
			validation: (Rule) => Rule.required().error(`Name the variant.`),
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			description: `Becomes the URL: /resume/<slug>.pdf`,
			options: { source: `title` },
			validation: (Rule) => Rule.required().error(`The variant needs a slug.`),
		},
		{
			name: `isDefault`,
			title: `Default Variant`,
			type: `boolean`,
			description: `Served at /resume.pdf and /resume.json. Exactly one variant should be the default.`,
			initialValue: false,
			validation: (Rule) =>
				Rule.custom(async (isDefault, context) => {
					if (!isDefault) return true;
					const id = context.document?._id?.replace(/^drafts\./, '');
					const others = await context
						.getClient({ apiVersion: API_VERSION })
						.fetch<number>(
							`count(*[_type == "resume" && isDefault == true && !(_id in [$id, $draftId])])`,
							{ id, draftId: `drafts.${id}` },
						);
					return others > 0 ? 'Another variant is already the default.' : true;
				}),
		},
		{
			name: `headline`,
			title: `Headline Override`,
			type: `string`,
			description: `Replaces the profile label for this variant. Leave empty to use the profile's.`,
		},
		{
			name: `summary`,
			title: `Summary Override`,
			type: `text`,
			rows: 4,
			description: `Replaces the profile summary for this variant. Leave empty to use the profile's.`,
			validation: (Rule) =>
				Rule.max(600).warning(`Long summaries eat into the one-page budget.`),
		},
		{
			name: `experience`,
			title: `Experience`,
			type: `array`,
			description: `Roles in display order, usually newest first.`,
			of: [{ type: `resumeExperienceEntry` }],
			validation: (Rule) => [
				Rule.required().min(1).error(`Add at least one role.`),
				Rule.max(5).warning(`More than five roles is unlikely to fit on one page.`),
			],
		},
		{
			name: `skills`,
			title: `Skills`,
			type: `array`,
			description: `Skill groups in display order.`,
			of: [{ type: `reference`, to: [{ type: `skillGroup` }] }],
			validation: (Rule) => Rule.unique().error(`Each skill group can appear only once.`),
		},
		{
			name: `education`,
			title: `Education`,
			type: `array`,
			of: [{ type: `reference`, to: [{ type: `education` }] }],
			validation: (Rule) => Rule.unique().error(`Each entry can appear only once.`),
		},
	],
	preview: {
		select: {
			title: `title`,
			slug: `slug.current`,
			isDefault: `isDefault`,
		},
		prepare({ title, slug, isDefault }) {
			return {
				title: isDefault ? `${title} (default)` : title,
				subtitle: slug ? `/resume/${slug}.pdf` : undefined,
			};
		},
	},
});
