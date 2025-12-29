'use client';

import { useEffect, useState } from 'react';
import { getStravaStats } from 'actions/strava-stats';
import { Headline, Paragraph } from 'components/typography';
import { TextArrow } from 'components/button';
import type { StravaDisplayStats } from 'lib/strava/types';
import { StatCard } from '../shared';
import type { StravaStatsInput, StravaVisibleStats } from '../types';
import s from './StravaStats.module.css';

interface StravaStatsProps {
	input: StravaStatsInput;
}

type StatKey = keyof StravaVisibleStats;

interface StatConfig {
	key: StatKey;
	getValue: (stats: StravaDisplayStats) => string | number;
	label: string;
	group: 'ytd' | 'allTime';
}

function formatTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	return `${hours}h ${minutes}m`;
}

const statConfigs: StatConfig[] = [
	{ key: 'ytdMiles', getValue: (s) => s.ytdMiles, label: 'Miles run this year', group: 'ytd' },
	{ key: 'ytdRuns', getValue: (s) => s.ytdRuns, label: 'Runs this year', group: 'ytd' },
	{ key: 'ytdTime', getValue: (s) => formatTime(s.ytdTimeSeconds), label: 'Time running', group: 'ytd' },
	{ key: 'ytdElevation', getValue: (s) => s.ytdElevationFeet.toLocaleString(), label: 'Feet climbed running', group: 'ytd' },
	{ key: 'allTimeMiles', getValue: (s) => s.allTimeMiles.toLocaleString(), label: 'All-time miles', group: 'allTime' },
	{ key: 'allTimeRuns', getValue: (s) => s.allTimeRuns.toLocaleString(), label: 'All-time runs', group: 'allTime' },
];

const defaultVisibleStats: StravaVisibleStats = {
	ytdMiles: true,
	ytdRuns: true,
	ytdTime: true,
	ytdElevation: true,
	allTimeMiles: false,
	allTimeRuns: false,
};

export const StravaStats = ({ input }: StravaStatsProps) => {
	const { title, visibleStats } = input;
	const visible: StravaVisibleStats = { ...defaultVisibleStats, ...visibleStats };
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
			<div className={s[`strava-stats--wrapper`]}>
				{title && <Headline tag="h3">{title}</Headline>}
				<p className={s.loading}>Loading stats...</p>
			</div>
		);
	}

	if (!stats || stats.error) {
		return (
			<div className={s[`strava-stats--wrapper`]}>
				{title && <Headline tag="h3">{title}</Headline>}
				<p className={s.error}>Unable to load running stats</p>
			</div>
		);
	}

	const visibleStats$ = statConfigs.filter((config) => visible[config.key]);
	const ytdStats = visibleStats$.filter((config) => config.group === 'ytd');
	const allTimeStats = visibleStats$.filter((config) => config.group === 'allTime');

	const renderStatGroup = (statGroup: StatConfig[]) => (
		<>
			{statGroup.map((config) => (
				<StatCard
					orientation='vertical'
					style='primary'
					padding='medium'
					gap='none'
					key={config.key}
				>
					<Headline
						tag='p'
						size='h4'
						collapse
						className='stat-value'
					>{config.getValue(stats)}</Headline>
					<Paragraph
						collapse
						className='stat-label'
					>{config.label}</Paragraph>
				</StatCard>
			))}
		</>
	);

	return (
		<section className={s.statsWrapper}>
			{title && <Headline tag="h3">{title}</Headline>}
			<div className={s.section}>
				<Headline
					tag='h4'
					size='h6'
					collapse
					className={s.sectionTitle}
				>Running stats</Headline>
				<div className={s.statsGrid}>
					{ytdStats.length > 0 && renderStatGroup(ytdStats)}
					{allTimeStats.length > 0 && renderStatGroup(allTimeStats)}
				</div>
			</div>
			<TextArrow
				href="https://www.strava.com/athletes/97586690"
				target="_blank"
				rel="noopener noreferrer"
			>View more on Strava</TextArrow>
		</section>
	);
};
