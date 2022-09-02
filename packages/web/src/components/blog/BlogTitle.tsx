import styles from './BlogTitle.module.scss'
import { Badge } from 'components/badge'

interface BlogTitleProps {
    featuredImage: string,
    title: string,
    categories: [
        category: {
            name: string,
        }
    ]
}

export const BlogTitle = ({ featuredImage, title, categories }: BlogTitleProps) => {
    const mapCategories = categories.map((category) => {
        return <Badge type='secondary' text={category.name} key={category.name} />
    })
    
    return (
        <section className={styles.wrapper}>
            {/* Image goes here */}
            {categories && (
                <div className={styles.category}>{mapCategories}</div>
            )}
            {title && <h1>{title}</h1>}
        </section>
    )
}