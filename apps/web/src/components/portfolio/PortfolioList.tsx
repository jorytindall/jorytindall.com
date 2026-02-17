import { BentoBox, BentoItem } from 'components/bento';
import { Headline } from 'components/typography';
import { linkResolver } from 'utils/linkResolver';
import { Badge } from 'components/badge';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { PortfolioListItem } from './PortfolioListItem';
import styles from './PortfolioList.module.css';

interface PortfolioListItem {
	input: any;
}

export const PortfolioList = ({ input }: PortfolioListItem) => {
	const portfolioItems = input.items.map((item) => {
		const galleryImages = item.item.galleryImages;
		const hasGallery = galleryImages && galleryImages.length > 0;

		const images = hasGallery
			? galleryImages
					.map((img: any) => {
						const url = getSanityImageUrl(img);
						return url ? { src: url, alt: img.alternativeText || '' } : null;
					})
					.filter(Boolean)
			: undefined;

		const fallbackImage = !hasGallery
			? getSanityImageUrl(item.item.featuredImage)
			: undefined;

		return (
				<BentoItem
					key={item.item.title}
					background='tertiary'
					size='medium'
					padding='large'
					gap='large'
					isInteractive={true}
					href={linkResolver('portfolioProject', item.item.slug.current)}
					image={fallbackImage}
					images={images}
					imagePosition="top"
					imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					altText={item.item.featuredImage?.alternativeText}
				>
					<Headline tag='h2' size='h4' color='secondary' collapse>{item.item.title}</Headline>
					<Badge text={item.item.client} type='inverse' />
				</BentoItem>
		);
	});

	return (
		<BentoBox
			className={styles.wrapper}
			isFullBleed={false}
		>
			{portfolioItems}
		</BentoBox>
	)
};
