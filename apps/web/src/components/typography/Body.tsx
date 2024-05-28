import styles from 'styles/components/typography/Body.module.scss';
import { getClasses } from 'utils/getClasses';

interface ParagraphProps {
	children: React.ReactNode;
	type?: 'primary' | 'secondary' | 'lead';
	color?: 'primary' | 'secondary' | 'light';
	collapse?: boolean;
}

interface CodeProps {
	children: React.ReactNode;
}

export const Paragraph = ({
	children,
	type = 'primary',
	color = 'secondary',
	collapse,
}: ParagraphProps) => {
	const classes = getClasses([
		styles[type],
		// @ts-ignore
		styles[color ? color : null],
		collapse ? styles.collapse : null,
	]);

	return <p className={classes}>{children}</p>;
};

export const Code = ({ children }: CodeProps) => {
	return <code className={styles.code}>{children}</code>;
};
