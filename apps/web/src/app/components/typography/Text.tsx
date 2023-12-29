import styles from 'styles/components/typography/Text.module.scss';
import { getClasses } from 'utils/getClasses';

interface TextProps {
	children: React.ReactNode;
	size?:
		| 'mega'
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'primary'
		| 'secondary'
		| 'lead';
	collapse?: boolean;
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
	color?: string;
}

export const Text = ({ children, size, collapse, tag, color }: TextProps) => {
	const classes = getClasses([
		// @ts-ignore
		styles[size ? size : tag],
		collapse ? styles.collapse : null,
		// @ts-ignore
		styles[color],
	]);

	switch (tag) {
		case 'h1':
			return <h1 className={classes}>{children}</h1>;
		case 'h2':
			return <h2 className={classes}>{children}</h2>;
		case 'h3':
			return <h3 className={classes}>{children}</h3>;
		case 'h4':
			return <h4 className={classes}>{children}</h4>;
		case 'h5':
			return <h5 className={classes}>{children}</h5>;
		case 'h6':
			return <h6 className={classes}>{children}</h6>;
		case 'p':
			return <p className={classes}>{children}</p>;
		case 'span':
			return <span className={classes}>{children}</span>;
		default:
			return <p className={classes}>{children}</p>;
	}
};
