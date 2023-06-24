import styles from 'styles/components/Badge.module.scss';
import { getClasses } from 'utils/getClasses';

interface BadgeProps {
	text: string;
	type?: string;
	style?: 'filled' | 'outlined',
}

export const Badge = ({
	text = 'Default badge text',
	type = 'primary',
	style = 'filled',
}: BadgeProps) => {
	const classes = getClasses([
		styles[`type_${type}--${style}`]]
	);

	return <span className={classes}>{text}</span>;
};
