import { getClasses } from 'utils/getClasses';
import s from './CenteredWrapper.module.css';

interface CenteredWrapperProps {
	children: React.ReactNode;
	semanticElement: 'div' | 'article' | 'section' | 'aside';
	collapseY?: boolean;
	collapseX?: boolean;
}

export const CenteredWrapper = ({
	children,
	semanticElement,
	collapseY,
	collapseX,
}: CenteredWrapperProps) => {
	const classes = getClasses([
		s.wrapper,
		collapseY && s['collapse-y'],
		collapseX && s['collapse-x'],
	]);

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
