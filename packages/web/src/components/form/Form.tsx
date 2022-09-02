import styles from './Form.module.scss';
import { getClasses } from 'utils/getClasses';

interface FormProps {
	children: React.ReactNode;
	name: string;
	method: 'POST' | 'GET';
	action?: string;
}

export const Form = ({ children, name, method, action }: FormProps) => {
	const classes = getClasses([styles.form]);

	return (
		<form name={name} method={method} action={action} className={classes}>
			{children}
		</form>
	);
};
