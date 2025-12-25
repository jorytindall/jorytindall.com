'use client';

import { Headline } from 'components/typography';
import { StravaStats } from 'components/strava-stats';
import styles from './PersonalStats.module.css';

interface StatSource {
	_key: string;
	_type: string;
	visibleStats?: Record<string, boolean>;
}

interface PersonalStatsProps {
	input: {
		_key: string;
		title?: string;
		statSources?: StatSource[];
	};
}

export const PersonalStats = ({ input }: PersonalStatsProps) => {
	const { title, statSources } = input;

	if (!statSources || statSources.length === 0) {
		return null;
	}

	return (
		<section className={styles.personalStats}>
			{title && <Headline tag="h3">{title}</Headline>}
			<div className={styles.statsContainer}>
				{statSources.map((source) => {
					switch (source._type) {
						case 'stravaStats':
							return (
								<StravaStats
									key={source._key}
									input={{ ...source, title: undefined }}
								/>
							);
						default:
							return null;
					}
				})}
			</div>
		</section>
	);
};
