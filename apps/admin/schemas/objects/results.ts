import { BiBarChart } from 'react-icons/bi';

export default {
	name: `results`,
	title: `Results`,
	type: `object`,
	description: `Results & outcome of a project or case study.`,
	icon: BiBarChart,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
		},
		{
			name: `description`,
			title: `Description`,
			type: `text`,
		},
		{
			name: `resultItems`,
			title: 'Result Items',
			type: 'array',
			of: [{ type: `resultItem` }],
		},
	],
};
