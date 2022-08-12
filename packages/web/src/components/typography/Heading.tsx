import styles from './Headline.module.scss'

export const Mega = ({ children }) => <h1 className={`${styles.heading} ${styles.heading_mega}`}>{children}</h1>

export const H1 = ({ children }) => <h1 className={`${styles.heading} ${styles.heading_1}`}>{children}</h1>

export const H2 = ({ children }) => <h2 className={`${styles.heading} ${styles.heading2}`}>{children}</h2>

export const H3 = ({ children }) => <h3 className={`${styles.heading} ${styles.heading3}`}>{children}</h3>

export const H4 = ({ children }) => <h4 className={`${styles.heading} ${styles.heading4}`}>{children}</h4>

export const H5 = ({ children }) => <h5 className={`${styles.heading} ${styles.heading5}`}>{children}</h5>

export const H6 = ({ children }) => <h6 className={`${styles.heading} ${styles.heading6}`}>{children}</h6>