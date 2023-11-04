import { BiChart } from 'react-icons/bi';

export default {
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
};
