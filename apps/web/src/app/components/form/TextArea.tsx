import styles from 'styles/components/form/TextArea.module.scss';

interface TextAreaProps {
	name?: string;
	placeholder?: string;
	rows?: number;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
	name,
	placeholder,
	rows = 8,
	onChange,
}: TextAreaProps) => {
	return (
		<textarea
			name={name}
			placeholder={placeholder}
			rows={rows}
			className={styles.textarea}
		></textarea>
	);
};
