import { Label } from './Label';
import { ItemWrapper } from './ItemWrapper';
import { Error } from './Error';
import styles from './Input.module.css';
import { getClasses } from 'utils/getClasses';

interface InputProps {
	placeholder?: string;
	type: 'text' | 'email' | 'tel' | 'hidden' | 'number' | 'password' | 'url';
	name: string;
	value?: string;
	id: string;
	required?: boolean;
	register?: any;
	validationSchema?: any;
	label: string;
	errors?: any;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
}

export const Input = ({
	placeholder,
	type,
	name,
	value,
	id,
	required,
	register,
	validationSchema,
	label,
	errors,
	onChange,
	autoFocus,
}: InputProps) => {
	const classes = getClasses([styles.input]);

	// Support both react-hook-form and controlled inputs
	const inputProps = register
		? register(name, validationSchema)
		: { value, onChange };

	return (
		<ItemWrapper>
			<Label htmlFor={id}>{label}</Label>
			<input
				placeholder={placeholder}
				type={type}
				name={name}
				className={classes}
				id={id}
				required={required}
				autoFocus={autoFocus}
				{...inputProps}
			/>
			{errors && errors[name]?.type === "required" && (
				<Error message={errors[name]?.message} />
			)}
			{errors && errors[name]?.type === "minLength" && (
				<Error message={errors[name]?.message} />
			)}
		</ItemWrapper>
	);
};
