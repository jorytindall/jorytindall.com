'use client';

import { Headline } from 'components/typography';
import { StravaStats } from 'components/personal-stats/strava';
import { SpotifyStats } from 'components/personal-stats/spotify';
import type { PersonalStatsInput, StatSource } from './types';
import styles from './PersonalStats.module.css';

interface PersonalStatsProps {
	input: PersonalStatsInput;
}

export const PersonalStats = ({ input }: PersonalStatsProps) => {
	const { title, statSources } = input;

	if (!statSources || statSources.length === 0) {
		return null;
	}

	return (
		<div className={styles.personalStats}>
			{title && <Headline color="primary" tag="h3">{title}</Headline>}
			<div className={styles.statsContainer}>
				{statSources.map((source) => {
					switch (source._type) {
						case 'stravaStats':
							return (
								<StravaStats
									key={source._key}
									input={{
										_key: source._key,
										visibleStats: source.visibleStats,
									}}
								/>
							);
						case 'spotifyStats':
							return (
								<SpotifyStats
									key={source._key}
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
				})}
			</div>
		</div>
	);
};
