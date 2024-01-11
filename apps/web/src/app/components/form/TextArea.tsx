import { Label } from './Label';
import { ItemWrapper } from './ItemWrapper';
import { Error } from './Error';
import styles from 'styles/components/form/TextArea.module.scss';

interface TextAreaProps {
	name: string;
	placeholder?: string;
	rows?: number;
	id?: string;
	label: string;
	regsiter?: any;
	validationSchema?: any;
	errors?: any;
}

export const TextArea = ({
	name,
	placeholder,
	rows = 8,
	id,
	label,
	regsiter,
	validationSchema,
	errors,
}: TextAreaProps) => {
	return (
		<ItemWrapper>
			<Label htmlFor={id}>{label}</Label>
			<textarea
				name={name}
				placeholder={placeholder}
				rows={rows}
				className={styles.textarea}
				id={id}
				{...regsiter(name, validationSchema)}
			></textarea>
			{errors && errors[name]?.type === "required" && (
				<Error message={errors[name]?.message} />
			)}
			{errors && errors[name]?.type === "minLength" && (
				<Error message={errors[name]?.message} />
			)}
		</ItemWrapper>
	);
};
