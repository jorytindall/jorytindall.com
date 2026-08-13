import { BiPaint } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: `portfolioProject`,
	title: `Portfolio Project`,
	type: `document`,
	icon: BiPaint,
	description: `Portfolio item with descriptive information about each project and case study information.`,
	fieldsets: [{ name: `projectInformation`, title: `Project Information` }],
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title of the portfolio project.`,
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
			name: `isFeatured`,
			title: `Is Featured`,
			type: `boolean`,
			description: `If the portfolio project as featured as featured, it will appear on the main portfolio page.`,
		},
		{
			name: `isPasswordProtected`,
			title: `Password Protected`,
			type: `boolean`,
			description: `If enabled, visitors will need to enter a password to view this project.`,
			initialValue: false,
		},
		{
			name: `author`,
			title: `Author`,
			type: `reference`,
			to: [{ type: `person` }],
		},
		{
			name: `shareImage`,
			title: `Share Image`,
			type: `image`,
		},
		{
			name: `featuredImage`,
			title: `Featured Image`,
			type: `mainImage`,
		},
		{
			name: `galleryImages`,
			title: `Gallery Images`,
			type: `array`,
			description: `Additional images displayed in a carousel on the portfolio card. If provided, these replace the featured image in the card view.`,
			of: [{ type: `mainImage` }],
		},
		{
			name: `overview`,
			title: `Overview`,
			type: `text`,
			description: `Provide a brief 2-3 sentence description of the project.`,
			fieldset: `projectInformation`,
		},
		{
			name: `client`,
			title: `Client`,
			type: `string`,
			description: `Who was this project for?`,
			fieldset: `projectInformation`,
		},
		{
			name: `clientLogo`,
			title: `Client Logo`,
			type: `mainImage`,
			fieldset: `projectInformation`,
		},
		{
			name: `types`,
			title: `Types`,
			type: `array`,
			description: `Project type(s), i.e. web application, iOS application.`,
			fieldset: `projectInformation`,
			of: [
				{
					name: `type`,
					title: `Type`,
					type: `string`,
				},
			],
		},
		{
			name: `roles`,
			title: `Roles`,
			type: `array`,
			description: `Role(s) filled in the project, tasks performed.`,
			fieldset: `projectInformation`,
			of: [
				{
					name: `role`,
					title: `Role`,
					type: `string`,
				},
			],
		},
		{
			name: `tools`,
			title: `Tools`,
			type: `array`,
			description: `Tools used during the project, i.e. Figma, Illustrator.`,
			fieldset: `projectInformation`,
			of: [
				{
					name: `tool`,
					title: `Tool`,
					type: `string`,
				},
			],
		},
		{
			name: `timeline`,
			title: `Timeline & Duration`,
			type: `string`,
			description: `When the project happened and how long it took.`,
			fieldset: `projectInformation`,
		},
		{
			name: `externalLink`,
			title: `External Link`,
			type: `url`,
			fieldset: `projectInformation`,
		},
		{
			name: `parentProject`,
			title: `Parent Project`,
			type: `reference`,
			description: `If this project is a chapter of a larger program, reference the hub project here. Chapters are listed on the hub's page and are hidden from the main portfolio list.`,
			fieldset: `projectInformation`,
			to: [{ type: `portfolioProject` }],
			options: {
				// Only hub projects are selectable: exclude this document (both the
				// published and draft id) and anything that is already a chapter.
				filter: ({ document }) => {
					const publishedId = document._id.replace(/^drafts\./, ``);
					return {
						filter: `!defined(parentProject) && !(_id in [$publishedId, $draftId])`,
						params: {
							publishedId,
							draftId: `drafts.${publishedId}`,
						},
					};
				},
			},
		},
		{
			name: `chapterOrder`,
			title: `Chapter Order`,
			type: `number`,
			description: `Position of this chapter on the parent project's page. Chapters without an order fall back to alphabetical.`,
			fieldset: `projectInformation`,
			hidden: ({ document }) => !document?.parentProject,
		},
		{
			name: `moduleContent`,
			type: `moduleContent`,
		},
	],
	preview: {
		select: {
			title: `title`,
			subtitle: `client`,
			media: `featuredImage`,
		},
	},
});
