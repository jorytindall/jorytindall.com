import styles from './Body.module.scss';
import { getClasses } from 'utils/getClasses';

interface ParagraphProps {
	children: React.ReactNode;
	type?: 'primary' | 'secondary' | 'lead';
	collapse?: boolean;
}

interface CodeProps {
	children: React.ReactNode;
}

export const Paragraph = ({
	children,
	type = 'primary',
	collapse,
}: ParagraphProps) => {
	const classes = getClasses([
		styles[type],
		collapse ? styles.collapse : null,
	]);

	return <p className={classes}>{children}</p>;
};

export const Code = ({ children }: CodeProps) => {
	return <code className={styles.code}>{children}</code>;
};
