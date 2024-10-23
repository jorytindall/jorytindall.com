import { BentoBox, BentoItem } from 'components/bento';
import { Headline } from 'components/typography';
import styles from 'styles/components/portfolio/PortfolioList.module.scss';
import { linkResolver } from 'utils/linkResolver';
import { Badge } from 'components/badge';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { PortfolioListItem } from './PortfolioListItem';

interface PortfolioListItem {
	input: any;
}

export const PortfolioList = ({ input }: PortfolioListItem) => {
	const portfolioItems = input.items.map((item) => {

		const image = getSanityImageUrl(item.item.featuredImage.asset._ref);

		console.log(item)

		return (
				<BentoItem
					key={item.item.title}
					background='tertiary'
					size='medium'
					padding='large'
					gap='large'
					isInteractive={true}
					href={linkResolver('portfolioProject', item.item.slug.current)}
					image={image}
					imagePosition="top"
					imageSizes="(max-width: 1200px) 600px, (max-width: 768px) 400px, 300px"
					altText={item.item.featuredImage.alternativeText}
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
