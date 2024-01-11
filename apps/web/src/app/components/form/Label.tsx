import styles from 'styles/components/form/Label.module.scss';

interface LabelProps {
	htmlFor?: string,
	children: React.ReactNode;
}

export const Label = ({ htmlFor, children }: LabelProps) => (
	<label htmlFor={htmlFor} className={styles.label}>{children}</label>
);
