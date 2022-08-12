import styles from './Body.module.scss'

export const Paragraph = ({ children }) => {
    return (
        <p className={`${styles.paragraph}`}>
            {children}
        </p>
    )
}