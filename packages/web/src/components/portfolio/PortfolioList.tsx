import { PortfolioListItem } from './PortfolioListItem'
import styles from 'styles/components/portfolio/PortfolioList.module.scss'

interface PortfolioListItem {
    input: any,
}

export const PortfolioList = ({ input }: PortfolioListItem) => {

    const portfolioItems = input.items.map(item => {
        return (
            <PortfolioListItem
                title={item.item.title}
                client={item.item.client}
                slug={item.item.slug.current}
                image={item.item.featuredImage}
                key={item.item.title}
            />
        )
    })

    return (
        <section className={styles.wrapper}>
            {portfolioItems}
        </section>
    )
}