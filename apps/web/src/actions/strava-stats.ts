'use server';

import { unstable_cache } from 'next/cache';
import { getAthleteStats, formatStats } from 'lib/strava/client';
import type { StravaDisplayStats } from 'lib/strava/types';

const getCachedStravaStats = unstable_cache(
	async (): Promise<StravaDisplayStats> => {
		try {
			const stats = await getAthleteStats();
			return formatStats(stats);
		} catch (error) {
			console.error('Failed to fetch Strava stats:', error);
			return {
				ytdMiles: 0,
				ytdRuns: 0,
				ytdTimeSeconds: 0,
				ytdElevationFeet: 0,
				allTimeMiles: 0,
				allTimeRuns: 0,
				error: 'Failed to load stats',
			};
		}
	},
	['strava-stats'],
	{
		revalidate: 1800, // 30 minutes
		tags: ['strava'],
	}
);

export async function getStravaStats(): Promise<StravaDisplayStats> {
	return getCachedStravaStats();
}
