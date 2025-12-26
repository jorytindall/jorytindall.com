import { BiMusic } from 'react-icons/bi';

export default {
	name: 'spotifyStats',
	title: 'Spotify Stats',
	type: 'object',
	description: 'Display listening statistics from Spotify.',
	icon: BiMusic,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Optional heading above the stats.',
		},
		{
			name: 'timeRange',
			title: 'Time Range',
			type: 'string',
			description: 'The time period for top artists and genres.',
			options: {
				list: [
					{ title: 'Last 4 Weeks', value: 'short_term' },
					{ title: 'Last 6 Months', value: 'medium_term' },
					{ title: 'All Time', value: 'long_term' },
				],
				layout: 'radio',
			},
			initialValue: 'medium_term',
		},
		{
			name: 'visibleStats',
			title: 'Visible Statistics',
			type: 'object',
			description: 'Select which statistics to display.',
			fields: [
				{
					name: 'topArtists',
					title: 'Show Top Artists',
					type: 'boolean',
					initialValue: true,
				},
				{
					name: 'topArtistsCount',
					title: 'Number of Top Artists',
					type: 'number',
					description: 'How many top artists to display (1-10).',
					validation: (Rule) => Rule.min(1).max(10),
					initialValue: 5,
					hidden: ({ parent }) => !parent?.topArtists,
				},
				{
					name: 'topGenres',
					title: 'Show Top Genres',
					type: 'boolean',
					initialValue: true,
				},
				{
					name: 'topGenresCount',
					title: 'Number of Top Genres',
					type: 'number',
					description: 'How many top genres to display (1-10).',
					validation: (Rule) => Rule.min(1).max(10),
					initialValue: 5,
					hidden: ({ parent }) => !parent?.topGenres,
				},
				{
					name: 'recentlyPlayed',
					title: 'Show Recently Played',
					type: 'boolean',
					initialValue: true,
				},
				{
					name: 'recentlyPlayedCount',
					title: 'Number of Recent Tracks',
					type: 'number',
					description: 'How many recently played tracks to display (1-10).',
					validation: (Rule) => Rule.min(1).max(10),
					initialValue: 5,
					hidden: ({ parent }) => !parent?.recentlyPlayed,
				},
			],
		},
	],
};
