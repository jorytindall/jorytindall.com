import styles from './Headline.module.scss';
import { getClasses } from 'utils/getClasses';

interface HeadlineProps {
	children: React.ReactNode;
	type?: 'mega' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	collapse?: boolean;
}

export const Headline = ({
	children,
	type = 'h1',
	collapse,
}: HeadlineProps) => {
	const classes = getClasses([
		styles[type],
		collapse ? styles.collapse : null,
	]);

	switch (type) {
		case 'mega':
			return <h1 className={classes}>{children}</h1>;
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
		default:
			return <h1 className={classes}>{children}</h1>;
	}
};
