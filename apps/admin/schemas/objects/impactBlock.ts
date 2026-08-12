import { BiChart } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: `impactBlock`,
	title: `Impact Block`,
	type: `object`,
	icon: BiChart,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
		},
		{
			name: `impacts`,
			title: `Impacts`,
			type: `array`,
			of: [
				{
					name: `impactItem`,
					title: `Impact Item`,
					type: `impactItem`,
				},
			],
		},
	],
});
