import styles from 'styles/components/form/Input.module.scss';
import { getClasses } from 'utils/getClasses';

interface InputProps {
	placeholder?: string;
	type: 'text' | 'email' | 'tel' | 'hidden' | 'number' | 'password' | 'url';
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
}

export const Input = ({
	placeholder,
	type,
	name,
	onChange,
	value
}: InputProps) => {
	const classes = getClasses([styles.input]);

	return (
		<input
			placeholder={placeholder}
			type={type}
			name={name}
			className={classes}
			value={value}
		/>
	);
};
