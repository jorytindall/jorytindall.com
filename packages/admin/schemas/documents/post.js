import { BiPencil } from 'react-icons/bi';

export default {
	name: `post`,
	title: `Post`,
	type: `document`,
	icon: BiPencil,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title of the post`,
			validation: (Rule) => (
				Rule.required().error('The post must have a title.'),
				Rule.min(3)
					.max(96)
					.warning(
						`It's recommended that the post title be less than 96 characters for length and SEO reasons.`
					)
			),
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			options: {
				source: `title`,
			},
			validation: (Rule) =>
				Rule.required().error(
					'The post needs a slug to properly generate from the template.'
				),
		},
		{
			name: `publishedDate`,
			title: `Published Date`,
			type: `date`,
			options: {
				dateFormat: `YYYY-MM-DD`,
				calendarTodayLabel: `Today`,
			},
			validation: (Rule) =>
				Rule.required().error(
					'Enter the date the post was published for accurate sorting and organization.'
				),
		},
		{
			name: `featuredImage`,
			title: `Featured Image`,
			type: `mainImage`,
			validation: (Rule) =>
				Rule.required().error(
					'Upload an image to be rendered within the post, but also in sharing on social platforms.'
				),
		},
		{
			name: `author`,
			title: `Author`,
			type: `reference`,
			to: [{ type: `person` }],
			validation: (Rule) =>
				Rule.required().error('The post needs an author.'),
		},
		{
			name: `categories`,
			title: `Categories`,
			type: `array`,
			description: `Categories the post belongs to.`,
			of: [
				{
					name: `category`,
					title: `Category`,
					type: `reference`,
					to: [{ type: `category` }],
				},
			],
		},
		{
			name: `excerpt`,
			title: `Exerpt`,
			type: `text`,
			description: `A short introduction or summary of the post.`,
		},
		{
			name: `content`,
			title: `Post Content`,
			description: `Enter content with rich text and embedded content models.`,
			type: `richText`,
			validation: (Rule) =>
				Rule.required().error(
					'The post needs content, otherwise why would you write it?'
				),
		},
	],
	preview: {
		select: {
			title: `title`,
			date: `publishedDate`,
			media: `featuredImage`,
		},
		prepare(selection) {
			const { title, date, media } = selection;
			return {
				title: title,
				subtitle: `Published on ${date}`,
				media: media,
			};
		},
	},
};
