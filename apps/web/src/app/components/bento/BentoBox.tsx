import { getClasses } from 'utils/getClasses';
import styles from 'styles/components/bento/BentoBox.module.scss';

interface BentoBoxProps {
	children: React.ReactNode;
	className?: string;
}

export const BentoBox = ({ children, className }: BentoBoxProps) => {
	const classes = getClasses([styles.wrapper, className]);

	return <section className={classes}>{children}</section>;
};
