// @ts-nocheck
import Image from 'next/image';
import { getSanityImageUrl } from 'utils/getSanityImage';
import styles from 'styles/components/gallery/FullWidthImage.module.scss';

interface FullWidthImageProps {
	input: {
		image: any;
		alternativeText: string;
	};
}

export const FullWidthImage = ({ input }: FullWidthImageProps) => {
	const { image, alternativeText } = input;

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
