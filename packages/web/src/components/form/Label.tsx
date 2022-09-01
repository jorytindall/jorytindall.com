import styles from './Label.module.scss'

interface LabelProps {
    children: React.ReactNode,
}

export const Label = ({ children }: LabelProps) => <label className={styles.label}>{children}</label>