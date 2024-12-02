import { getClasses } from 'utils/getClasses';
import styles from './BentoBox.module.css';

interface BentoBoxProps {
	children: React.ReactNode;
	className?: string;
	isFullBleed?: boolean;
}

export const BentoBox = ({
	isFullBleed = true,
	children,
	className
}: BentoBoxProps) => {
	const classes = getClasses([
		styles.wrapper,
		[isFullBleed ? styles.isFullBleed : null],
		className
	]);

	return <section className={classes}>{children}</section>;
};
