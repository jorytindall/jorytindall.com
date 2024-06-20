import styles from 'styles/components/layout/Container.module.scss';
import { getClasses } from 'utils/getClasses';

interface ContainerProps {
	density?: 'default' | 'spacious' | 'packed' | 'collapse';
	isFlex?: boolean;
	flexDirection?: 'row' | 'column';
	semanticElement?: 'div' | 'section' | 'article' | 'aside';
	children?: React.ReactNode;
	justify?:
		| 'normal'
		| 'flex-start'
		| 'center'
		| 'flex-end'
		| 'space-between'
		| 'space-around';
	align?: 'normal' | 'flex-start' | 'center' | 'flex-end';
	textAlign?: 'left' | 'center' | 'right';
	gap?: 'small' | 'default' | 'large' | 'extra-large';
	className?: string,
}

const Container = ({
	density = 'default',
	isFlex,
	flexDirection,
	justify,
	semanticElement = 'div',
	children,
	align,
	gap,
	textAlign,
	className,
}: ContainerProps) => {
	const classes = getClasses([
		styles[`density_${density}`],
		[isFlex === true ? styles[`is-flex`] : null],
		styles[`is-flex--${flexDirection}`],
		styles[`is-flex--${justify}`],
		styles[`is-flex--${align}`],
		styles[`is-flex--${gap}`],
		styles[`text-align--${textAlign}`],
		className,
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

export { Container }
export type { ContainerProps }