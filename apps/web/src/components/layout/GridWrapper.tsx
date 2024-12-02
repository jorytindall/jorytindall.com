import styles from './GridWrapper.module.css';

interface GridWrapperProps {
	children: React.ReactNode;
}

export const GridWrapper = ({ children }: GridWrapperProps) => (
	<section className={styles.gridWrapper}>{children}</section>
);
