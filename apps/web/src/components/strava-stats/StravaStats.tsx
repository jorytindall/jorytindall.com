'use client';

import { useEffect, useState } from 'react';
import { getStravaStats } from 'actions/strava-stats';
import { Headline } from 'components/typography';
import type { StravaDisplayStats } from 'lib/strava/types';
import styles from './StravaStats.module.css';

interface VisibleStats {
	ytdMiles?: boolean;
	ytdRuns?: boolean;
	ytdTime?: boolean;
	ytdElevation?: boolean;
	allTimeMiles?: boolean;
	allTimeRuns?: boolean;
}

interface StravaStatsProps {
	input: {
		_key: string;
		title?: string;
		visibleStats?: VisibleStats;
	};
}

function formatTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	return `${hours}h ${minutes}m`;
}

const defaultVisibleStats: VisibleStats = {
	ytdMiles: true,
	ytdRuns: true,
	ytdTime: true,
	ytdElevation: true,
	allTimeMiles: false,
	allTimeRuns: false,
};

export const StravaStats = ({ input }: StravaStatsProps) => {
	const { title, visibleStats } = input;
	const visible: VisibleStats = {
		ytdMiles: visibleStats?.ytdMiles ?? defaultVisibleStats.ytdMiles,
		ytdRuns: visibleStats?.ytdRuns ?? defaultVisibleStats.ytdRuns,
		ytdTime: visibleStats?.ytdTime ?? defaultVisibleStats.ytdTime,
		ytdElevation: visibleStats?.ytdElevation ?? defaultVisibleStats.ytdElevation,
		allTimeMiles: visibleStats?.allTimeMiles ?? defaultVisibleStats.allTimeMiles,
		allTimeRuns: visibleStats?.allTimeRuns ?? defaultVisibleStats.allTimeRuns,
	};
	const [stats, setStats] = useState<StravaDisplayStats | null>(null);
	const [loading, setLoading] = useState(true);

	// When used as a child of PersonalStats, don't render a section wrapper
	const isStandalone = title !== undefined;
	const Wrapper = isStandalone ? 'section' : 'div';
	const wrapperClass = isStandalone ? styles.stravaStats : styles.stravaStatsInline;

	useEffect(() => {
		async function fetchStats() {
			try {
				const data = await getStravaStats();
				setStats(data);
			} catch (error) {
				console.error('Failed to fetch Strava stats:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchStats();
	}, []);

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
				<p className={styles.error}>Unable to load running stats</p>
			</Wrapper>
		);
	}

	const hasYtdStats = visible.ytdMiles || visible.ytdRuns || visible.ytdTime || visible.ytdElevation;
	const hasAllTimeStats = visible.allTimeMiles || visible.allTimeRuns;

	return (
		<Wrapper className={wrapperClass}>
			{title && <Headline tag="h3">{title}</Headline>}
			{hasYtdStats && (
				<div className={styles.statsGrid}>
					{visible.ytdMiles && (
						<div className={styles.statItem}>
							<span className={styles.statValue}>{stats.ytdMiles}</span>
							<span className={styles.statLabel}>Miles run this year</span>
						</div>
					)}
					{visible.ytdRuns && (
						<div className={styles.statItem}>
							<span className={styles.statValue}>{stats.ytdRuns}</span>
							<span className={styles.statLabel}>Runs this year</span>
						</div>
					)}
					{visible.ytdTime && (
						<div className={styles.statItem}>
							<span className={styles.statValue}>{formatTime(stats.ytdTimeSeconds)}</span>
							<span className={styles.statLabel}>Time running</span>
						</div>
					)}
					{visible.ytdElevation && (
						<div className={styles.statItem}>
							<span className={styles.statValue}>{stats.ytdElevationFeet.toLocaleString()}</span>
							<span className={styles.statLabel}>Feet climbed running</span>
						</div>
					)}
				</div>
			)}
			{hasAllTimeStats && (
				<div className={styles.statsGrid}>
					{visible.allTimeMiles && (
						<div className={styles.statItem}>
							<span className={styles.statValue}>{stats.allTimeMiles.toLocaleString()}</span>
							<span className={styles.statLabel}>All-time miles</span>
						</div>
					)}
					{visible.allTimeRuns && (
						<div className={styles.statItem}>
							<span className={styles.statValue}>{stats.allTimeRuns.toLocaleString()}</span>
							<span className={styles.statLabel}>All-time runs</span>
						</div>
					)}
				</div>
			)}
		</Wrapper>
	);
};
