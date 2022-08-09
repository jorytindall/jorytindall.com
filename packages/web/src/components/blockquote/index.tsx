import styles from './Blockquote.module.scss'

export const Blockquote = ({ text }) => {
    return (
        <article className={styles.wrapper}>
            <blockquote className={styles.blockquote}>
                "{text}"
            </blockquote>
        </article>
    )
}