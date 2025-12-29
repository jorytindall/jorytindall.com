'use client';

import { motion } from 'framer-motion';
import { Headline } from 'components/typography';
import { StravaStats } from 'components/personal-stats/strava';
import { SpotifyStats } from 'components/personal-stats/spotify';
import type { PersonalStatsInput, StatSource } from './types';
import styles from './PersonalStats.module.css';

interface PersonalStatsProps {
	input: PersonalStatsInput;
	overlay?: boolean;
}

const containerVariants = {
	hidden: {
		opacity: 0,
	},
	enter: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		x: 5,
	},
	enter: {
		opacity: 1,
		y: 0,
		x: 0,
	},
};

export const PersonalStats = ({ input, overlay = true }: PersonalStatsProps) => {
	const { title, statSources } = input;

	if (!statSources || statSources.length === 0) {
		return null;
	}

	const renderStatSource = (source: StatSource) => {
		switch (source._type) {
			case 'stravaStats':
				return (
					<StravaStats
						input={{
							_key: source._key,
							visibleStats: source.visibleStats,
						}}
					/>
				);
			case 'spotifyStats':
				return (
					<SpotifyStats
						input={{
							_key: source._key,
							visibleStats: source.visibleStats,
							timeRange: source.timeRange,
						}}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<motion.div
			className={styles.personalStats}
			variants={containerVariants}
			initial="hidden"
			animate={overlay ? 'enter' : 'hidden'}
		>
			{title && <Headline color="primary" tag="h3">{title}</Headline>}
			{statSources.map((source) => (
				<motion.div key={source._key} variants={itemVariants}>
					{renderStatSource(source)}
				</motion.div>
			))}
		</motion.div>
	);
};
