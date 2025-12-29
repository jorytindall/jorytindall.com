import styles from './Container.module.css';
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
	const directionMap: Record<string, string> = {
		row: styles.isFlexRow,
		column: styles.isFlexColumn,
	};

	const justifyMap: Record<string, string> = {
		normal: styles.isFlexNormal,
		'flex-start': styles.isFlexStart,
		center: styles.isFlexCenter,
		'flex-end': styles.isFlexEnd,
		'space-between': styles.isFlexSpaceBetween,
		'space-around': styles.isFlexSpaceAround,
	};

	const alignMap: Record<string, string> = {
		normal: styles.isFlexAlignNormal,
		'flex-start': styles.isFlexAlignStart,
		center: styles.isFlexAlignCenter,
		'flex-end': styles.isFlexAlignEnd,
	};

	const gapMap: Record<string, string> = {
		small: styles.isFlexGapSmall,
		default: styles.isFlexGapDefault,
		large: styles.isFlexGapLarge,
		'extra-large': styles.isFlexGapExtraLarge,
	};

	const textAlignMap: Record<string, string> = {
		left: styles.textAlignLeft,
		center: styles.textAlignCenter,
		right: styles.textAlignRight,
	};

	const classes = getClasses([
		styles[`density_${density}`],
		isFlex === true ? styles.isFlex : null,
		flexDirection ? directionMap[flexDirection] : null,
		justify ? justifyMap[justify] : null,
		align ? alignMap[align] : null,
		gap ? gapMap[gap] : null,
		textAlign ? textAlignMap[textAlign] : null,
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