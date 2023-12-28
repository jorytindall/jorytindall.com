// @ts-nocheck
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { sanityClient } from 'lib/sanity.server';
import styles from 'styles/components/gallery/FullWidthImage.module.scss';

interface FullWidthImageProps {
	input: {
		image: any;
		alternativeText: string;
	};
}

export const FullWidthImage = ({ input }: FullWidthImageProps) => {
	const { image, alternativeText } = input;

	const imageProps = useNextSanityImage(sanityClient, image);

	const css = { maxWidth: '100%', height: 'auto' }

	const imageSrc = getSanityImageUrl(image);

	return (
		<Image
			fill
			src={imageSrc}
			// style={css}
			alt={alternativeText}
			className={styles.fullWidthImage}
		/>
	);
};
