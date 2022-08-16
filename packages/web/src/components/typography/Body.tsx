import styles from './Body.module.scss'

export const Paragraph = ({ children, type }) => {
    return (
        <p className={styles.paragraph}>
            {children}
        </p>
    )
}