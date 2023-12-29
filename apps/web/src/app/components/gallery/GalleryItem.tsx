import Image from 'next/image';
import { Paragraph } from 'app/components/typography';
import { getSanityImageUrl } from 'utils/getSanityImage';
import s from 'styles/components/gallery/GalleryItem.module.css'

interface GalleryItemProps {
	key: string;
	image: string;
	altText: string;
	caption: string;
}

export const GalleryItem = ({ image, altText, caption }: GalleryItemProps) => {

	const galleryImage = getSanityImageUrl(image)

	return (
		<div className={s.wrapper}>
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
		</div>
	);
};
