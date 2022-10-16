import Image from 'next/image';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from 'lib/sanity.server';
import { linkResolver } from 'utils/linkResolver';
import { Headline, Paragraph } from 'components/typography';
import styles from 'styles/components/portfolio/PortfolioList.module.scss';

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
	const imageProps: object = useNextSanityImage(sanityClient, image);

	return (
		<article className={styles.itemWrapper} key={title}>
			<Link href={linkResolver('portfolioProject', slug)}>
				<a>
					<Image
						src={image}
						{...imageProps}
						layout="responsive"
						alt={image.alternativeText}
					/>
					<Headline tag="h4" collapse>
						{title}
					</Headline>
					<Paragraph type="primary" collapse>
						{client}
					</Paragraph>
				</a>
			</Link>
		</article>
	);
};
