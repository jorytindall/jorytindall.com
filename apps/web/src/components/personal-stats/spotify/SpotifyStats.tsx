'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { getSpotifyStats } from 'actions/spotify-stats';
import { Headline, Paragraph } from 'components/typography';
import { TextArrow } from 'components/button';
import type { SpotifyDisplayStats } from 'lib/spotify/types';
import type { SpotifyStatsInput, SpotifyVisibleStats } from '../types';
import { RenderGenre, RenderArtist, RenderTrack } from './SubComponents';
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

const sectionConfigs: SectionConfig[] = [
	{
		key: 'topArtists',
		title: 'Top Artists',
		getData: (stats) => stats.topArtists,
		containerClass: s.gridList,
		renderItems: (stats) => stats.topArtists.map(RenderArtist),
	},
	{
		key: 'topGenres',
		title: 'Top Genres',
		getData: (stats) => stats.topGenres,
		containerClass: s.badgeList,
		renderItems: (stats) => stats.topGenres.map(RenderGenre),
	},
	{
		key: 'recentlyPlayed',
		title: 'Recently Played',
		getData: (stats) => stats.recentlyPlayed,
		containerClass: s.gridList,
		renderItems: (stats) => stats.recentlyPlayed.map(RenderTrack),
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
			<div>
				{title && <Headline tag="h3">{title}</Headline>}
				<Paragraph className={s.loading}>Loading stats...</Paragraph>
			</div>
		);
	}

	if (!stats || stats.error) {
		return (
			<div>
				{title && <Headline tag="h3">{title}</Headline>}
				<Paragraph className={s.error}>Unable to load listening stats</Paragraph>
			</div>
		);
	}

	const visibleSections = sectionConfigs.filter(
		(config) => visible[config.key] && config.getData(stats).length > 0
	);

	return (
		<div className={s.wrapper}>
			{title && <Headline tag="h3">{title}</Headline>}
			{visibleSections.map((config) => (
				<div key={config.key} className={s.section}>
					<Headline
						tag='h4'
						size='h6'
						collapse
						className={s.sectionTitle}
					>{config.title}</Headline>
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
