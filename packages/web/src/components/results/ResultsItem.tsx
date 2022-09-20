import styles from 'styles/components/results/ResultsItem.module.scss'
import { Headline, Paragraph } from 'components/typography'

interface ResultsItemProps {
    headline?: string,
    description?: string,
    metric?: string,
    percentageDirection?: 'up' | 'down',
}

export const ResultsItem = ({
    headline,
    description,
    metric,
    percentageDirection,
}: ResultsItemProps) => {
    return (
        <article>
            {metric && (
                <span className={styles.percentage}>
                    <Headline type='h1' collapse>{metric}</Headline>
                </span>
            )}
            {percentageDirection && (
                <p>Add the percentage direction</p>
            )}
            {headline && (
                <Headline type='h6' collapse>{headline}</Headline>
            )}
            {description && (
                <Paragraph type='secondary' collapse>{description}</Paragraph>
            )}
        </article>
    )
}
