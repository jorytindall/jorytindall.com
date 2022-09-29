import { getClasses } from 'utils/getClasses'
import { Headline } from 'components/typography'
import { ResultsItem } from './ResultsItem'
import styles from 'styles/components/results/Results.module.scss'

interface ResultsProps {
    input: {
        description?: string,
        resultItems: any[],
    }
}

export const Results = ({ input }: ResultsProps) => {

    const { description, resultItems } = input

    const classes = getClasses([
        styles.results,
    ])

    console.log(input)

    return (
        <section className={classes}>
            {description && (
                <Headline type='h5'>{description}</Headline>
            )}
            {resultItems && (
                <div>
                    {resultItems.map((item) => {
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