import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from 'lib/sanity.server';
import { Paragraph } from 'components/typography';

interface GalleryItemProps {
	key: string;
	image: string;
	altText: string;
	caption: string;
}

export const GalleryItem = ({ image, altText, caption }: GalleryItemProps) => {
	const imageProps = useNextSanityImage(sanityClient, image);

	return (
		<div>
			{image && (
				<Image {...imageProps} layout="intrinsic" alt={altText} />
			)}
			{caption && (
				<Paragraph type="secondary" collapse>
					{caption}
				</Paragraph>
			)}
		</div>
	);
};
