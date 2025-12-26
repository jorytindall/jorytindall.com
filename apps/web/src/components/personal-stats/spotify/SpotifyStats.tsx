'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getSpotifyStats } from 'actions/spotify-stats';
import { Headline } from 'components/typography';
import type { SpotifyDisplayStats, TimeRange } from 'lib/spotify/types';
import styles from './SpotifyStats.module.css';

interface VisibleStats {
	topArtists?: boolean;
	topArtistsCount?: number;
	topGenres?: boolean;
	topGenresCount?: number;
	recentlyPlayed?: boolean;
	recentlyPlayedCount?: number;
}

interface SpotifyStatsProps {
	input: {
		_key: string;
		title?: string;
		timeRange?: TimeRange;
		visibleStats?: VisibleStats;
	};
}

const defaultVisibleStats: VisibleStats = {
	topArtists: true,
	topArtistsCount: 5,
	topGenres: true,
	topGenresCount: 5,
	recentlyPlayed: true,
	recentlyPlayedCount: 5,
};

export const SpotifyStats = ({ input }: SpotifyStatsProps) => {
	const { title, timeRange = 'medium_term', visibleStats } = input;
	const visible: VisibleStats = {
		topArtists: visibleStats?.topArtists ?? defaultVisibleStats.topArtists,
		topArtistsCount:
			visibleStats?.topArtistsCount ?? defaultVisibleStats.topArtistsCount,
		topGenres: visibleStats?.topGenres ?? defaultVisibleStats.topGenres,
		topGenresCount:
			visibleStats?.topGenresCount ?? defaultVisibleStats.topGenresCount,
		recentlyPlayed:
			visibleStats?.recentlyPlayed ?? defaultVisibleStats.recentlyPlayed,
		recentlyPlayedCount:
			visibleStats?.recentlyPlayedCount ??
			defaultVisibleStats.recentlyPlayedCount,
	};

	const [stats, setStats] = useState<SpotifyDisplayStats | null>(null);
	const [loading, setLoading] = useState(true);

	const isStandalone = title !== undefined;
	const Wrapper = isStandalone ? 'section' : 'div';
	const wrapperClass = isStandalone
		? styles.spotifyStats
		: styles.spotifyStatsInline;

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
			<Wrapper className={wrapperClass}>
				{title && <Headline tag="h3">{title}</Headline>}
				<p className={styles.loading}>Loading stats...</p>
			</Wrapper>
		);
	}

	if (!stats || stats.error) {
		return (
			<Wrapper className={wrapperClass}>
				{title && <Headline tag="h3">{title}</Headline>}
				<p className={styles.error}>Unable to load listening stats</p>
			</Wrapper>
		);
	}

	return (
		<Wrapper className={wrapperClass}>
			{title && <Headline tag="h3">{title}</Headline>}

			{visible.topArtists && stats.topArtists.length > 0 && (
				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Top Artists</h4>
					<div className={styles.artistsGrid}>
						{stats.topArtists.map((artist) => (
							<a
								key={artist.name}
								href={artist.spotifyUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.artistItem}
							>
								{artist.imageUrl && (
									<Image
										src={artist.imageUrl}
										alt={artist.name}
										width={64}
										height={64}
										className={styles.artistImage}
									/>
								)}
								<span className={styles.artistName}>{artist.name}</span>
							</a>
						))}
					</div>
				</div>
			)}

			{visible.topGenres && stats.topGenres.length > 0 && (
				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Top Genres</h4>
					<div className={styles.genresList}>
						{stats.topGenres.map((genre) => (
							<span key={genre} className={styles.genrePill}>
								{genre}
							</span>
						))}
					</div>
				</div>
			)}

			{visible.recentlyPlayed && stats.recentlyPlayed.length > 0 && (
				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Recently Played</h4>
					<div className={styles.tracksList}>
						{stats.recentlyPlayed.map((track, index) => (
							<a
								key={`${track.name}-${index}`}
								href={track.spotifyUrl}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.trackItem}
							>
								{track.albumImageUrl && (
									<Image
										src={track.albumImageUrl}
										alt={track.name}
										width={48}
										height={48}
										className={styles.trackImage}
									/>
								)}
								<div className={styles.trackInfo}>
									<span className={styles.trackName}>{track.name}</span>
									<span className={styles.trackArtist}>{track.artistName}</span>
								</div>
							</a>
						))}
					</div>
				</div>
			)}
		</Wrapper>
	);
};
