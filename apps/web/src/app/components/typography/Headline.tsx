import styles from 'styles/components/typography/Headline.module.scss';
import { getClasses } from 'utils/getClasses';

interface HeadlineProps {
	children: React.ReactNode;
	size?: 'mega' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	collapse?: boolean;
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
	color?: string;
}

export const Headline = ({
	children,
	size,
	collapse,
	tag,
	color,
}: HeadlineProps) => {
	const classes = getClasses([
		// @ts-ignore
		styles[size ? size : tag],
		// @ts-ignore
		styles[color ? color : null],
		collapse ? styles.collapse : null,
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
		default:
			return <h1 className={classes}>{children}</h1>;
	}
};
