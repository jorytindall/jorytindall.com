import { BiIdCard } from 'react-icons/bi';
import { defineType } from 'sanity';

/**
 * Singleton. The personal details shared by every résumé variant; maps to JSON Resume
 * `basics`.
 *
 * The `production` dataset is public, so every field here is readable by anyone with the
 * project ID — GROQ projections do not make a field private. Do not add a phone number,
 * street address or anything else that must stay private to this document.
 */
export default defineType({
	name: `resumeProfile`,
	title: `Résumé Profile`,
	type: `document`,
	icon: BiIdCard,
	fields: [
		{
			name: `name`,
			title: `Name`,
			type: `string`,
			validation: (Rule) => Rule.required().error(`The profile needs a name.`),
		},
		{
			name: `label`,
			title: `Label`,
			type: `string`,
			description: `Default headline under the name, e.g. "Lead Product Designer". Variants can override it.`,
			validation: (Rule) => Rule.required().error(`Add a default headline.`),
		},
		{
			name: `summary`,
			title: `Summary`,
			type: `text`,
			rows: 4,
			description: `Short professional summary. Variants can override it.`,
			validation: (Rule) =>
				Rule.max(600).warning(`Long summaries eat into the one-page budget.`),
		},
		{
			name: `email`,
			title: `Public Email`,
			type: `string`,
			description: `Published on the PDF and in /resume.json.`,
			validation: (Rule) => Rule.email().error(`Enter a valid email address.`),
		},
		{
			name: `website`,
			title: `Website`,
			type: `url`,
		},
		{
			name: `location`,
			title: `Location`,
			type: `object`,
			description: `City and region only. Never a street address.`,
			options: { columns: 3 },
			fields: [
				{ name: `city`, title: `City`, type: `string` },
				{ name: `region`, title: `Region`, type: `string` },
				{
					name: `countryCode`,
					title: `Country Code`,
					type: `string`,
					description: `ISO 3166-1 alpha-2, e.g. US.`,
					validation: (Rule) =>
						Rule.uppercase().length(2).error(`Use a two-letter country code.`),
				},
			],
		},
		{
			name: `links`,
			title: `Links`,
			type: `array`,
			of: [{ type: `resumeLink` }],
		},
	],
	preview: {
		select: {
			title: `name`,
			subtitle: `label`,
		},
	},
});
