import styles from 'styles/components/layout/GridWrapper.module.scss'

interface GridWrapperProps {
    children: React.ReactNode,
}

export const GridWrapper = ({ children }: GridWrapperProps) => <section className={styles.gridWrapper}>{children}</section>