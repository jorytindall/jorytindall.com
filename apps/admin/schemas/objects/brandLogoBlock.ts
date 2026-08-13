import { BiHeart } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: `brandLogoBlock`,
	title: `Brand Logo Block`,
	type: `object`,
	icon: BiHeart,
	fields: [
		{
			name: `logos`,
			title: `Logos`,
			type: `array`,
			of: [
				{
					name: `brandLogo`,
					title: `Logo`,
					type: `brandLogo`,
				},
			],
		},
	],
});
