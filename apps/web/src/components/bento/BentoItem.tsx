import Link from 'next/link';
import Image from 'next/image';
import { Carousel } from 'components/carousel';
import { getClasses } from 'utils/getClasses';
import styles from './BentoItem.module.css';

interface BentoItemImage {
	src: string;
	alt: string;
}

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
	images?: BentoItemImage[];
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
	images,
	imagePosition = 'top',
	imageSizes,
	altText,
}: BentoItemProps) => {
	const sizeMap: Record<string, string> = {
		small: styles.sizeSmall,
		medium: styles.sizeMedium,
		large: styles.sizeLarge,
		'x-large': styles.sizeXLarge,
		full: styles.sizeFull,
	};

	const paddingMap: Record<string, string> = {
		none: styles.paddingNone,
		small: styles.paddingSmall,
		medium: styles.paddingMedium,
		large: styles.paddingLarge,
		'x-large': styles.paddingXLarge,
	};

	const gapMap: Record<string, string> = {
		none: styles.gapNone,
		small: styles.gapSmall,
		medium: styles.gapMedium,
		large: styles.gapLarge,
		'x-large': styles.gapXLarge,
	};

	const outerClasses = getClasses([
		styles.outer,
		// @ts-ignore
		styles[background],
		sizeMap[size],
		isInteractive ? styles.isInteractive : null,
		className,
	]);

	const innerClasses = getClasses([
		styles.inner,
		paddingMap[padding],
		gap ? gapMap[gap] : null,
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

	const renderMedia = () => {
		if (images && images.length > 0) {
			return (
				<div className={styles.imageWrapper}>
					<Carousel>
						{images.map((img, index) => (
							<Image
								key={index}
								src={img.src}
								alt={img.alt}
								fill
								sizes={imageSizes}
							/>
						))}
					</Carousel>
				</div>
			);
		}

		if (image) {
			return (
				<div className={styles.imageWrapper}>
					{renderImage()}
				</div>
			);
		}

		return null;
	}

	const mediaTop = imagePosition === 'top' ? renderMedia() : null;
	const mediaBottom = imagePosition === 'bottom' ? renderMedia() : null;

	if (isInteractive === false) {
		return (
			<article className={outerClasses}>
				{mediaTop}
				<div className={innerClasses}>
					{children}
				</div>
				{mediaBottom}
			</article>
		)
	} else {
		return (
			<Link
				href={href}
				className={outerClasses}
			>
				{mediaTop}
				<div className={innerClasses}>
					{children}
				</div>
				{mediaBottom}
			</Link>
		)
	}
};
