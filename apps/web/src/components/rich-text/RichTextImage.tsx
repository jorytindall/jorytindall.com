import Image from 'next/image';
import { getImageDimensions } from '@sanity/asset-utils';
import { getSanityImageUrl } from 'utils/getSanityImage';
import styles from './RichTextImage.module.css';

interface RichTextImageProps {
	value?: {
		asset?: { _ref?: string };
		alternativeText?: string;
		caption?: string;
	};
}

/*
 * `mainImage` is offered inside every rich text field, so an editor can drop an
 * image into any prose block. This used to render the literal string
 * "This is an image".
 */
export const RichTextImage = ({ value }: RichTextImageProps) => {
	const src = getSanityImageUrl(value);

	// getSanityImageUrl returns null for a missing or unresolvable asset, which
	// also tells us getImageDimensions below has something valid to read.
	if (!src) {
		return null;
	}

	const { width, height } = getImageDimensions(value as any);

	return (
		<figure className={styles.figure}>
			<Image
				src={src}
				alt={value?.alternativeText ?? ''}
				width={width}
				height={height}
				sizes="(max-width: 768px) 100vw, 720px"
				className={styles.image}
			/>
			{value?.caption && <figcaption className={styles.caption}>{value.caption}</figcaption>}
		</figure>
	);
};
