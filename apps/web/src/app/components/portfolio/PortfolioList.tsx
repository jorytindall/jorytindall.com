import { PortfolioListItem } from './PortfolioListItem';
import { BentoBox, BentoItem } from 'app/components/bento';
import { Headline } from 'app/components/typography';
import styles from 'styles/components/portfolio/PortfolioList.module.scss';
import { linkResolver } from 'utils/linkResolver';
import { Badge } from 'app/components/badge';

interface PortfolioListItem {
	input: any;
}

export const PortfolioList = ({ input }: PortfolioListItem) => {
	const portfolioItems = input.items.map((item) => {
		return (
			<BentoItem
				key={item.item.title}
				background='tertiary'
				size='medium'
				padding='large'
				gap='large'
				isInteractive={true}
				href={linkResolver('portfolioProject', item.item.slug.current)}
			>
				<Headline tag='h2' size='h4' color='primary' collapse>{item.item.title}</Headline>
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
