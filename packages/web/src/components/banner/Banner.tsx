import styles from './Banner.module.scss'

export const Banner = ({ content }) => {
    return (
        <aside className={styles.banner}>
            {content}
        </aside>
    )
}