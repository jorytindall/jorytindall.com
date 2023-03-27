import Image from 'next/image';
import { Paragraph } from 'components/typography';
import { getSanityImageUrl } from 'utils/getSanityImage';
import s from 'styles/components/gallery/GalleryItem.module.css'

interface GalleryItemProps {
	key: string;
	image: string;
	altText: string;
	caption: string;
}

export const GalleryItem = ({ image, altText, caption }: GalleryItemProps) => {
	return (
		<div className={s.wrapper}>
			{image && (
				<div className={s.imageWrapper}>
					<Image src={getSanityImageUrl(image)} fill alt={altText} className={s.image} />
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
