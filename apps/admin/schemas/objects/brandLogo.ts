import { defineType } from 'sanity';

export default defineType({
	name: `brandLogo`,
	title: `Brand Logo`,
	type: `object`,
	fields: [
		{
			name: `brand`,
			title: `Brand`,
			type: `string`,
		},
		{
			name: `asset`,
			title: `Asset`,
			type: `mainImage`,
		},
	],
});
