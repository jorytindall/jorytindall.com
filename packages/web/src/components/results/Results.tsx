import { getClasses } from 'utils/getClasses'
import { Headline } from 'components/typography'
import { ResultsItem } from './ResultsItem'
import styles from 'styles/components/results/Results.module.scss'

interface ResultsProps {
    description?: string,
    resultsItems: any[],
}

export const Results = ({
    description,
    resultsItems,
}: ResultsProps) => {

    const classes = getClasses([
        styles.results,
    ])

    return (
        <section className={classes}>
            {description && (
                <Headline type='h5'>{description}</Headline>
            )}
            {resultsItems && (
                <div>
                    {resultsItems.map((item) => {
                        return (
                            <ResultsItem
                                key={item._key}
                                headline={item.headline}
                                description={item.description}
                                metric={item.metric}
                                percentageDirection={item.percentageDirection}
                            />
                        )
                    })}
                </div>
            )}
        </section>
    )
}