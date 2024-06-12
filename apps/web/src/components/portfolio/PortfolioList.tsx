'use client'

import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
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

		// Define custom motion components
		const MotionHeadline = motion(Headline)
		const MotionBentoItem = motion(BentoItem)

		return (
			<AnimatePresence initial={false} mode='wait'>
				<MotionBentoItem
					key={item.item.title}
					background='tertiary'
					size='medium'
					padding='large'
					gap='large'
					isInteractive={true}
					href={linkResolver('portfolioProject', item.item.slug.current)}
					image={image}
					imagePosition="top"
				>
					<MotionHeadline exit={{opacity: 0}} tag='h2' size='h4' color='secondary' collapse>{item.item.title}</MotionHeadline>
					<Badge text={item.item.client} type='inverse' />
				</MotionBentoItem>
			</AnimatePresence>
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
