import Image from 'next/image';
import Link from 'next/link';
import { linkResolver } from 'utils/linkResolver';
import { Headline, Paragraph } from 'components/typography';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { Badge } from 'components/badge';
import styles from './PortfolioListItem.module.css';

interface PortfolioListItemProps {
	title: string;
	slug: string;
	client: string;
	image: any;
}

export const PortfolioListItem = ({
	title,
	slug,
	client,
	image,
}: PortfolioListItemProps) => {
	return (
		<Link
			href={linkResolver('portfolioProject', slug)}
			className={styles.linkWrapper}
		>
			<article className={styles.itemWrapper} key={title}>
				<div className={styles.imageWrapper}>
					<Image
						// @ts-ignore
						src={getSanityImageUrl(image)}
						alt={image.alternativeText}
						fill
						sizes="(max-width: 1200px) 600px, (max-width: 768px) 400px, 300px"
					/>
				</div>
				<Headline tag="h4" collapse>
					{title}
				</Headline>
				<Paragraph type="primary" collapse>
					<Badge text={client} type="primary" />
				</Paragraph>
			</article>
		</Link>
	);
};
