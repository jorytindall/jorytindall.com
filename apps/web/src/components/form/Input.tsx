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
}: InputProps) => {
	const classes = getClasses([styles.input]);

	return (
		<ItemWrapper>
			<Label htmlFor={id}>{label}</Label>
			<input
				placeholder={placeholder}
				type={type}
				name={name}
				className={classes}
				value={value}
				id={id}
				required={required}
				{...register(name, validationSchema)}
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
