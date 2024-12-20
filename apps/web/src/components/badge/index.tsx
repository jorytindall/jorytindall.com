import styles from './Badge.module.css';
import { getClasses } from 'utils/getClasses';

interface BadgeProps {
	text: string,
	type?: 'primary' | 'secondary' | 'tertiary' | 'inverse',
}

export const Badge = ({
	text = 'Default badge text',
	type = 'primary',
}: BadgeProps) => {
	const classes = getClasses([styles[type]]);

	return <span className={classes}>{text}</span>;
};
