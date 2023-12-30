import Link from 'next/link';
import Image from 'next/image';
import { getClasses } from 'utils/getClasses';
import styles from 'styles/components/bento/BentoItem.module.scss';

interface BentoItemProps {
	children: React.ReactNode;
	background?: 'primary' | 'secondary' | 'tertiary' | 'light' | 'dark';
	className?: string;
	size: string;
	padding: string;
	gap: string;
	isJustified?: boolean;
	isInteractive?: boolean;
	href?: any;
	image?: any;
	imagePosition?: 'top' | 'bottom';
}

export const BentoItem = ({
	children,
	background,
	className,
	size,
	padding,
	gap,
	isJustified,
	isInteractive = false,
	href,
	image,
	imagePosition = 'top'
}: BentoItemProps) => {

	const outerClasses = getClasses([
		styles.outer,
		// @ts-ignore
		styles[background],
		styles[`size--${size}`],
		isInteractive ? styles.isInteractive : null,
		className,
	]);

	const innerClasses = getClasses([
		styles.inner,
		styles[`padding--${padding}`],
		styles[`gap--${gap}`],
		isJustified ? styles.isJustified : null,
	])

	if (isInteractive === false) {
		return (
			<article className={outerClasses}>
				{image && imagePosition === 'top' &&
					<Image
						src={image}
						alt={image.alt}
					/>
				}
				<div className={innerClasses}>
					{children}
				</div>
				{image && imagePosition === 'bottom' &&
					<Image
						src={image}
						alt={image.alt}
					/>
				}
			</article>
		)
	} else {
		return (
			<Link
				href={href}
				className={outerClasses}
			>
				{image && imagePosition === 'top' &&
					<Image
						src={image}
						alt={image.alt}
					/>
				}
				<div className={innerClasses}>
					{children}
				</div>
				{image && imagePosition === 'bottom' &&
					<Image
						src={image}
						alt={image.alt}
					/>
				}
			</Link>
		)
	}
};
