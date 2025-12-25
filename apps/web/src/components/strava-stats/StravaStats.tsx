'use client';

import { useEffect, useState } from 'react';
import { getStravaStats } from 'actions/strava-stats';
import { Headline } from 'components/typography';
import type { StravaDisplayStats } from 'lib/strava/types';
import styles from './StravaStats.module.css';

interface StravaStatsProps {
	input: {
		_key: string;
		title?: string;
		showAllTimeStats?: boolean;
	};
}

function formatTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	return `${hours}h ${minutes}m`;
}

export const StravaStats = ({ input }: StravaStatsProps) => {
	const { title, showAllTimeStats } = input;
	const [stats, setStats] = useState<StravaDisplayStats | null>(null);
	const [loading, setLoading] = useState(true);

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
			<section className={styles.stravaStats}>
				{title && <Headline tag="h3">{title}</Headline>}
				<p className={styles.loading}>Loading stats...</p>
			</section>
		);
	}

	if (!stats || stats.error) {
		return (
			<section className={styles.stravaStats}>
				{title && <Headline tag="h3">{title}</Headline>}
				<p className={styles.error}>Unable to load running stats</p>
			</section>
		);
	}

	return (
		<section className={styles.stravaStats}>
			{title && <Headline tag="h3">{title}</Headline>}
			<div className={styles.statsGrid}>
				<div className={styles.statItem}>
					<span className={styles.statValue}>{stats.ytdMiles}</span>
					<span className={styles.statLabel}>Miles this year</span>
				</div>
				<div className={styles.statItem}>
					<span className={styles.statValue}>{stats.ytdRuns}</span>
					<span className={styles.statLabel}>Runs this year</span>
				</div>
				<div className={styles.statItem}>
					<span className={styles.statValue}>{formatTime(stats.ytdTimeSeconds)}</span>
					<span className={styles.statLabel}>Time running</span>
				</div>
				<div className={styles.statItem}>
					<span className={styles.statValue}>{stats.ytdElevationFeet.toLocaleString()}</span>
					<span className={styles.statLabel}>Feet climbed</span>
				</div>
			</div>
			{showAllTimeStats && (
				<div className={styles.allTimeStats}>
					<p className={styles.allTimeLabel}>All-time</p>
					<p className={styles.allTimeValue}>
						{stats.allTimeMiles.toLocaleString()} miles across {stats.allTimeRuns.toLocaleString()} runs
					</p>
				</div>
			)}
		</section>
	);
};
