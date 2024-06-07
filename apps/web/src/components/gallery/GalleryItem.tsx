import Image from 'next/image';
import { Paragraph } from 'components/typography';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { Expand } from './Expand';
import s from 'styles/components/gallery/GalleryItem.module.scss';

interface GalleryItemProps {
	key: string;
	image: string;
	altText: string;
	caption: string;
}

export const GalleryItem = ({ image, altText, caption }: GalleryItemProps) => {
	// @ts-ignore
	const galleryImage: string = getSanityImageUrl(image ?? '');

	return (
		<a href={galleryImage} className={s.wrapper}>
			<Expand />
			{image && (
				<div className={s.imageWrapper}>
					<Image
						// @ts-ignore
						src={galleryImage}
						fill
						alt={altText}
						className={s.image}
						sizes="(max-width: 768px) 40vw"
					/>
				</div>
			)}
			{caption && (
				<Paragraph type="secondary" collapse>
					{caption}
				</Paragraph>
			)}
		</a>
	);
};
