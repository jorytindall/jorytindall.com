import { BiRun } from 'react-icons/bi';

export default {
	name: 'stravaStats',
	title: 'Strava Stats',
	type: 'object',
	description: 'Display running statistics from Strava.',
	icon: BiRun,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Optional heading above the stats.',
		},
		{
			name: 'showAllTimeStats',
			title: 'Show All-Time Stats',
			type: 'boolean',
			description: 'Display all-time running totals in addition to YTD.',
			initialValue: false,
		},
	],
};
