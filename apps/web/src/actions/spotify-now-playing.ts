'use server';

import { unstable_cache } from 'next/cache';
import { getCurrentlyPlaying, formatNowPlaying } from 'lib/spotify/client';
import type { NowPlayingData } from 'lib/spotify/types';

const getCachedNowPlaying = unstable_cache(
	async (): Promise<NowPlayingData> => {
		try {
			const currentlyPlaying = await getCurrentlyPlaying();
			return formatNowPlaying(currentlyPlaying);
		} catch (error) {
			console.error('Failed to fetch now playing:', error);
			return {
				isPlaying: false,
				trackName: null,
				artistName: null,
				albumImageUrl: null,
				spotifyUrl: null,
			};
		}
	},
	['spotify-now-playing'],
	{
		revalidate: 10, // 10 seconds
		tags: ['spotify-now-playing'],
	}
);

export async function getNowPlaying(): Promise<NowPlayingData> {
	return getCachedNowPlaying();
}
