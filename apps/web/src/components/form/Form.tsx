import styles from 'styles/components/form/Form.module.scss';
import { getClasses } from 'utils/getClasses';

interface FormProps {
	children: React.ReactNode;
	name?: string;
	method?: 'POST' | 'GET';
	action?: any;
	onSubmit?: any;
}

export const Form = ({ children, name, method, action, onSubmit }: FormProps) => {
	const classes = getClasses([styles.form]);

	return (
		<form
			name={name}
			method={method}
			action={action}
			className={classes}
			onSubmit={onSubmit}
		>
			{children}
		</form>
	);
};
