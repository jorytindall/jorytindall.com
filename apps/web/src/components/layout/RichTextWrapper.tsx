import { getClasses } from 'utils/getClasses';
import styles from './RichTextWrapper.module.css';

interface RichTextWrapperProps {
	children: React.ReactNode;
	collapse?: boolean;
}

export const RichTextWrapper = ({
	children,
	collapse,
}: RichTextWrapperProps) => {
	const classes = getClasses([
		[styles.wrapper],
		[collapse === true ? styles.collapse : null],
	]);

	return <div className={classes}>{children}</div>;
};
