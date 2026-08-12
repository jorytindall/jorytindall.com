import { BiUserCircle } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: `person`,
	title: `Person`,
	type: `document`,
	icon: BiUserCircle,
	fields: [
		{
			name: `name`,
			title: `Name`,
			type: `string`,
			validation: (Rule) => Rule.required().error('The person needs a name.'),
		},
		{
			name: `instrument`,
			title: `Instrument`,
			type: `string`,
		},
		{
			name: `image`,
			title: `Image`,
			type: `mainImage`,
		},
		{
			name: `website`,
			title: `Website`,
			type: `string`,
		},
	],
	preview: {
		select: {
			title: `name`,
			media: `image`,
		},
	},
});
