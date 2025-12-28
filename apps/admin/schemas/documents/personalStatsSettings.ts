import { BiStats } from 'react-icons/bi';

export default {
	name: 'personalStatsSettings',
	title: 'Personal Stats Settings',
	type: 'document',
	icon: BiStats,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Optional heading above the stats.',
		},
		{
			name: 'statSources',
			title: 'Stat Sources',
			type: 'array',
			description: 'Add statistics from different sources.',
			of: [{ type: 'stravaStats' }, { type: 'spotifyStats' }],
		},
	],
	preview: {
		prepare() {
			return {
				title: 'Personal Stats Settings',
			};
		},
	},
};
