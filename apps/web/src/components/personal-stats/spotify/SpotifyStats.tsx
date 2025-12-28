'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { getSpotifyStats } from 'actions/spotify-stats';
import { Headline } from 'components/typography';
import { TextArrow } from 'components/button';
import type { SpotifyDisplayStats, DisplayArtist, DisplayTrack } from 'lib/spotify/types';
import type { SpotifyStatsInput, SpotifyVisibleStats } from '../types';
import s from './SpotifyStats.module.css';

interface SpotifyStatsProps {
	input: SpotifyStatsInput;
}

type SectionKey = 'topArtists' | 'topGenres' | 'recentlyPlayed';

interface SectionConfig {
	key: SectionKey;
	title: string;
	getData: (stats: SpotifyDisplayStats) => unknown[];
	containerClass: string;
	renderItems: (stats: SpotifyDisplayStats) => ReactNode;
}

const defaultVisibleStats: SpotifyVisibleStats = {
	topArtists: true,
	topArtistsCount: 5,
	topGenres: true,
	topGenresCount: 5,
	recentlyPlayed: true,
	recentlyPlayedCount: 5,
};

const renderArtist = (artist: DisplayArtist) => (
	<a
		key={artist.name}
		href={artist.spotifyUrl}
		target="_blank"
		rel="noopener noreferrer"
		className={s.artistItem}
	>
		{artist.imageUrl && (
			<Image
				src={artist.imageUrl}
				alt={artist.name}
				width={64}
				height={64}
				className={s.artistImage}
			/>
		)}
		<span className={s.artistName}>{artist.name}</span>
	</a>
);

const renderGenre = (genre: string) => (
	<span key={genre} className={s.genrePill}>
		{genre}
	</span>
);

const renderTrack = (track: DisplayTrack, index: number) => (
	<a
		key={`${track.name}-${index}`}
		href={track.spotifyUrl}
		target="_blank"
		rel="noopener noreferrer"
		className={s.trackItem}
	>
		{track.albumImageUrl && (
			<Image
				src={track.albumImageUrl}
				alt={track.name}
				width={48}
				height={48}
				className={s.trackImage}
			/>
		)}
		<div className={s.trackInfo}>
			<span className={s.trackName}>{track.name}</span>
			<span className={s.trackArtist}>{track.artistName}</span>
		</div>
	</a>
);

const sectionConfigs: SectionConfig[] = [
	{
		key: 'topArtists',
		title: 'Top Artists',
		getData: (stats) => stats.topArtists,
		containerClass: s.artistsGrid,
		renderItems: (stats) => stats.topArtists.map(renderArtist),
	},
	{
		key: 'topGenres',
		title: 'Top Genres',
		getData: (stats) => stats.topGenres,
		containerClass: s.genresList,
		renderItems: (stats) => stats.topGenres.map(renderGenre),
	},
	{
		key: 'recentlyPlayed',
		title: 'Recently Played',
		getData: (stats) => stats.recentlyPlayed,
		containerClass: s.tracksList,
		renderItems: (stats) => stats.recentlyPlayed.map(renderTrack),
	},
];

export const SpotifyStats = ({ input }: SpotifyStatsProps) => {
	const { title, timeRange = 'medium_term', visibleStats } = input;
	const visible: SpotifyVisibleStats = { ...defaultVisibleStats, ...visibleStats };

	const [stats, setStats] = useState<SpotifyDisplayStats | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchStats() {
			try {
				const data = await getSpotifyStats(
					timeRange,
					visible.topArtistsCount,
					visible.topGenresCount,
					visible.recentlyPlayedCount
				);
				setStats(data);
			} catch (error) {
				console.error('Failed to fetch Spotify stats:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchStats();
	}, [
		timeRange,
		visible.topArtistsCount,
		visible.topGenresCount,
		visible.recentlyPlayedCount,
	]);

	if (loading) {
		return (
			<div className={s.spotifyStats}>
				{title && <Headline tag="h3">{title}</Headline>}
				<p className={s.loading}>Loading stats...</p>
			</div>
		);
	}

	if (!stats || stats.error) {
		return (
			<div className={s.spotifyStats}>
				{title && <Headline tag="h3">{title}</Headline>}
				<p className={s.error}>Unable to load listening stats</p>
			</div>
		);
	}

	const visibleSections = sectionConfigs.filter(
		(config) => visible[config.key] && config.getData(stats).length > 0
	);

	return (
		<div className={s.spotifyStats}>
			{title && <Headline tag="h3">{title}</Headline>}
			{visibleSections.map((config) => (
				<div key={config.key} className={s.section}>
					<h4 className={s.sectionTitle}>{config.title}</h4>
					<div className={config.containerClass}>
						{config.renderItems(stats)}
					</div>
				</div>
			))}
			<TextArrow
				href="https://open.spotify.com/user/1224682961?si=29c84f6c943340ff"
				target="_blank"
				rel="noopener noreferrer"
			>View more on Spotify</TextArrow>
		</div>
	);
};
