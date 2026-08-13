import { BiHome } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: `homePage`,
	title: `Home Page`,
	type: `document`,
	icon: BiHome,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			initialValue: `/`,
			readOnly: true,
		},
		{
			name: `moduleContent`,
			title: `Module Content`,
			type: `moduleContent`,
		},
	],
	preview: {
		select: {
			title: `title`,
			subtitle: `modeulContent`,
		},
	},
});
