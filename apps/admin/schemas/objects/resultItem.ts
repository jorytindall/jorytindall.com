import { BiChart } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: `resultItem`,
	title: `Result Item`,
	type: `object`,
	icon: BiChart,
	fields: [
		{
			name: `headline`,
			title: `Headline`,
			type: `string`,
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
		},
		{
			name: `metric`,
			title: `Metric`,
			type: `string`,
			description: `(Optional) If the result uses a metric value, enter it here, otherwise it will be hidden by default.`,
		},
		{
			name: `percentageDirection`,
			title: `Percentage Direction`,
			type: `string`,
			description: `(Optional) Corresponds with the percentage and won't be rendered if the percentage is empty.`,
			options: {
				list: [
					{ title: `Up`, value: `up` },
					{ title: `Down`, value: `down` },
				],
			},
		},
	],
});
