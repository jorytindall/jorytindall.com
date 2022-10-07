import styles from 'styles/components/Badge.module.scss';
import { getClasses } from 'utils/getClasses';

interface BadgeProps {
	text: string;
	type?: string;
}

export const Badge = ({
	text = 'Default badge text',
	type = 'primary',
}: BadgeProps) => {
	const classes = getClasses([styles[type]]);

	return <span className={classes}>{text}</span>;
};
