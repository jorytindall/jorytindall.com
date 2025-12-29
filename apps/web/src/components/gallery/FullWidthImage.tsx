import Image from 'next/image';
import { getSanityImageUrl } from 'utils/getSanityImage';
import styles from './FullWidthImage.module.css';

interface FullWidthImageProps {
	input: {
		image: any;
		alternativeText: string;
	};
}

export const FullWidthImage = ({ input }: FullWidthImageProps) => {
	const { image, alternativeText } = input;
	const imageSrc = getSanityImageUrl(image);

	if (!imageSrc) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Image
				fill
				src={imageSrc}
				alt={alternativeText ?? ''}
				className={styles.fullWidthImage}
				sizes="100vw"
			/>
		</div>
	);
};
