import styles from 'styles/components/results/Results.module.scss';
import { Headline, Paragraph } from 'app/components/typography';

interface ResultsItemProps {
	headline?: string;
	description?: string;
	metric?: string;
	percentageDirection?: 'up' | 'down';
}

export const ResultsItem = ({
	headline,
	description,
	metric,
	percentageDirection,
}: ResultsItemProps) => {
	return (
		<article className={styles.resultsItem}>
			{metric && (
				<span className={styles.percentage}>
					<Headline tag="h1" collapse>
						{metric}
					</Headline>
				</span>
			)}
			{percentageDirection && <p>Add the percentage direction</p>}
			{headline && (
				<Headline tag="h6" collapse>
					{headline}
				</Headline>
			)}
			{description && (
				<Paragraph type="secondary" collapse>
					{description}
				</Paragraph>
			)}
		</article>
	);
};
