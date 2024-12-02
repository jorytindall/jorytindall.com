import Link from 'next/link';
import Image from 'next/image';
import { getClasses } from 'utils/getClasses';
import styles from './BentoItem.module.css';

interface BentoItemProps {
	children: React.ReactNode
	background?: 'primary' | 'secondary' | 'tertiary' | 'light' | 'dark'
	className?: string
	size: 'small' | 'medium' | 'large' | 'x-large' | 'full'
	padding: 'none' | 'small' | 'medium' | 'large' | 'x-large'
	gap?: 'none' | 'small' | 'medium' | 'large' | 'x-large'
	isJustified?: boolean
	isInteractive?: boolean
	href?: any
	image?: any
	imagePosition?: 'top' | 'bottom';
	altText?: string;
	imageSizes?: string;
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
	imagePosition = 'top',
	imageSizes,
	altText,
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

	const renderImage = () => {
		return (
			<Image
				src={image}
				// @ts-ignore
				alt={altText}
				fill
				sizes={imageSizes}
			/>
		)
	}

	if (isInteractive === false) {
		return (
			<article className={outerClasses}>
				{image && imagePosition === 'top' &&
					<div className={styles.imageWrapper}>
						{renderImage()}
					</div>
				}
				<div className={innerClasses}>
					{children}
				</div>
				{image && imagePosition === 'bottom' &&
					<div className={styles.imageWrapper}>
						{renderImage()}
					</div>
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
					<div className={styles.imageWrapper}>
						{renderImage()}
					</div>
				}
				<div className={innerClasses}>
					{children}
				</div>
				{image && imagePosition === 'bottom' &&
					<div className={styles.imageWrapper}>
						{renderImage()}
					</div>
				}
			</Link>
		)
	}
};
