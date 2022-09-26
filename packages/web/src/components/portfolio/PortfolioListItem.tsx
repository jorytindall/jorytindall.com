import Link from 'next/link'
import Image from 'next/image'
import { linkResolver } from 'utils/linkResolver'
import { Headline, Paragraph } from 'components/typography'
import styles from 'styles/components/portfolio/PortfolioListItem.module.scss'
import { Input } from 'components/form'

interface PortfolioListItemProps {
    input: any,
}

export const PortfolioListItem = ({ input }: PortfolioListItemProps) => {

    const portfolioItems = input.items.map(item => {
        return (
            <article className={styles.itemWrapper} key={item.item.title}>
                <Link href={linkResolver('portfolio', item.item.slug.current)}>
                    <a>
                        {/* insert image here */}
                        <Headline type='h4' collapse>{item.item.title}</Headline>
                        <Paragraph type='primary' collapse>{item.item.client}</Paragraph>
                    </a>
                </Link>
            </article>
        )
    })

    return (
        <section className={styles.wrapper}>
            {portfolioItems}
        </section>
    )
}