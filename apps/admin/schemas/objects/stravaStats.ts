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
			name: 'visibleStats',
			title: 'Visible Statistics',
			type: 'object',
			description: 'Select which statistics to display.',
			fields: [
				{
					name: 'ytdMiles',
					title: 'Miles This Year',
					type: 'boolean',
					initialValue: true,
				},
				{
					name: 'ytdRuns',
					title: 'Runs This Year',
					type: 'boolean',
					initialValue: true,
				},
				{
					name: 'ytdTime',
					title: 'Time Running (YTD)',
					type: 'boolean',
					initialValue: true,
				},
				{
					name: 'ytdElevation',
					title: 'Elevation Climbed (YTD)',
					type: 'boolean',
					initialValue: true,
				},
				{
					name: 'allTimeMiles',
					title: 'All-Time Miles',
					type: 'boolean',
					initialValue: false,
				},
				{
					name: 'allTimeRuns',
					title: 'All-Time Runs',
					type: 'boolean',
					initialValue: false,
				},
			],
		},
	],
};
