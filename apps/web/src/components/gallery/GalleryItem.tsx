// GalleryItem.tsx
import Image from 'next/image';
import { Paragraph } from 'components/typography';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { Expand } from './Expand';
import s from './GalleryItem.module.css';

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
            <Expand className={s.expandIcon} />
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