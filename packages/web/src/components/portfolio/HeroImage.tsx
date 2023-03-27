import Image from 'next/image';
import { getSanityImageUrl } from 'utils/getSanityImage';
import s from 'styles/components/portfolio/HeroImage.module.css';

interface HeroImageProps {
	source: string;
	altText: string;
}

export const HeroImage = ({ source, altText }: HeroImageProps) => {
	return (
		<section className={s.heroWrapper}>
			<Image
				src={getSanityImageUrl(source)}
				alt={altText}
				fill
				className={s.image}
				sizes="(max-width: 1800) 100vw"
			/>
		</section>
	);
};
