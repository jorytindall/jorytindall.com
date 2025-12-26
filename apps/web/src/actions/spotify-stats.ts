'use server';

import { unstable_cache } from 'next/cache';
import { getSpotifyDisplayStats } from 'lib/spotify/client';
import type { SpotifyDisplayStats, TimeRange } from 'lib/spotify/types';

const getCachedSpotifyStats = unstable_cache(
	async (
		timeRange: TimeRange,
		artistLimit: number,
		genreLimit: number,
		recentLimit: number
	): Promise<SpotifyDisplayStats> => {
		try {
			return await getSpotifyDisplayStats(
				timeRange,
				artistLimit,
				genreLimit,
				recentLimit
			);
		} catch (error) {
			console.error('Failed to fetch Spotify stats:', error);
			return {
				topArtists: [],
				topGenres: [],
				recentlyPlayed: [],
				error: 'Failed to load stats',
			};
		}
	},
	['spotify-stats'],
	{
		revalidate: 86400, // 24 hours
		tags: ['spotify'],
	}
);

export async function getSpotifyStats(
	timeRange: TimeRange = 'medium_term',
	artistLimit: number = 5,
	genreLimit: number = 5,
	recentLimit: number = 5
): Promise<SpotifyDisplayStats> {
	return getCachedSpotifyStats(timeRange, artistLimit, genreLimit, recentLimit);
}
