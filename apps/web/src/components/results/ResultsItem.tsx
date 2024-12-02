import { ArrowDownSquare, ArrowUpSquare } from './Arrows';
import styles from './ResultsItem.module.css';
import { Headline, Paragraph } from 'components/typography';

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
					{percentageDirection ? (percentageDirection === 'up' ? <ArrowUpSquare /> : <ArrowDownSquare />) : null}
				</span>
			)}
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
