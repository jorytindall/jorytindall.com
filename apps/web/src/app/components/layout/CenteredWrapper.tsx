import { getClasses } from 'utils/getClasses';
import s from 'styles/components/layout/CenteredWrapper.module.scss';

interface CenteredWrapperProps {
	children: React.ReactNode;
	semanticElement: 'div' | 'article' | 'section';
}

export const CenteredWrapper = ({ children, semanticElement }) => {
	const classes = getClasses([s.wrapper]);

	switch (semanticElement) {
		case 'div':
			return <div className={classes}>{children}</div>;
		case 'section':
			return <section className={classes}>{children}</section>;
		case 'article':
			return <article className={classes}>{children}</article>;
		case 'aside':
			return <aside className={classes}>{children}</aside>;
	}
};
