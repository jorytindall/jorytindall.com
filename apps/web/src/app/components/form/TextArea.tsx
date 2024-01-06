import styles from 'styles/components/form/TextArea.module.scss';

interface TextAreaProps {
	name?: string;
	placeholder?: string;
	rows?: number;
}

export const TextArea = ({ name, placeholder, rows = 8 }: TextAreaProps) => {
	return (
		<textarea
			name={name}
			placeholder={placeholder}
			rows={rows}
			className={styles.textarea}
		></textarea>
	);
};
