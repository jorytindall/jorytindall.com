import Image from 'next/image';
import { getSanityImageUrl } from 'utils/getSanityImage';
import s from './HeroImage.module.css';

interface HeroImageProps {
	source: string;
	altText: string;
}

export const HeroImage = ({ source, altText }: HeroImageProps) => {
	return (
		<section className={s.heroWrapper}>
			<Image
				// @ts-ignore
				src={getSanityImageUrl(source)}
				alt={altText}
				fill
				className={s.image}
				sizes="(max-width: 1800) 100vw"
			/>
		</section>
	);
};
