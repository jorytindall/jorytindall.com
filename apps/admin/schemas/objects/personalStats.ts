import { BiStats } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: 'personalStats',
	title: 'Personal Stats',
	type: 'object',
	description: 'Display personal statistics from various sources.',
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
});
