import styles from 'styles/components/button/ButtonGroup.module.scss';
import { getClasses } from 'utils/getClasses';

interface ButtonGroupProps {
	children: React.ReactNode;
}

export const ButtonGroup = ({ children }: ButtonGroupProps) => {
	const classes = getClasses([styles['button-group']]);

	return <div className={classes}>{children}</div>;
};
