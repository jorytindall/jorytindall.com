import type { TimeRange } from 'lib/spotify/types';

// Shared types for personal stats components

export interface BaseStatsProps {
	_key: string;
	title?: string;
}

// Strava types
export interface StravaVisibleStats {
	ytdMiles?: boolean;
	ytdRuns?: boolean;
	ytdTime?: boolean;
	ytdElevation?: boolean;
	allTimeMiles?: boolean;
	allTimeRuns?: boolean;
}

export interface StravaStatsInput extends BaseStatsProps {
	visibleStats?: StravaVisibleStats;
}

// Spotify types
export interface SpotifyVisibleStats {
	topArtists?: boolean;
	topArtistsCount?: number;
	topGenres?: boolean;
	topGenresCount?: number;
	recentlyPlayed?: boolean;
	recentlyPlayedCount?: number;
}

export interface SpotifyStatsInput extends BaseStatsProps {
	timeRange?: TimeRange;
	visibleStats?: SpotifyVisibleStats;
}

// Discriminated union for stat sources
export interface StravaStatSource {
	_key: string;
	_type: 'stravaStats';
	title?: string;
	visibleStats?: StravaVisibleStats;
}

export interface SpotifyStatSource {
	_key: string;
	_type: 'spotifyStats';
	title?: string;
	visibleStats?: SpotifyVisibleStats;
	timeRange?: TimeRange;
}

export type StatSource = StravaStatSource | SpotifyStatSource;

export interface PersonalStatsInput {
	_key: string;
	title?: string;
	statSources?: StatSource[];
}
