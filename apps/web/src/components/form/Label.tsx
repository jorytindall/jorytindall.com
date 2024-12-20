import styles from './Label.module.css';

interface LabelProps {
	htmlFor?: string,
	children: React.ReactNode;
}

export const Label = ({ htmlFor, children }: LabelProps) => (
	<label htmlFor={htmlFor} className={styles.label}>{children}</label>
);
