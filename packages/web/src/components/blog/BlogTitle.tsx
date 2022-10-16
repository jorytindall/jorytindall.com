import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from 'lib/sanity.server';
import { Badge } from 'components/badge';
import { Headline } from 'components/typography';
import styles from 'styles/components/blog/BlogTitle.module.scss';

interface BlogTitleProps {
	featuredImage: {
		alternativeText?: string;
	};
	title: string;
	categories: [
		category: {
			name: string;
		}
	];
}

export const BlogTitle = ({
	featuredImage,
	title,
	categories,
}: BlogTitleProps) => {
	const mapCategories = categories.map((category) => {
		return (
			<Badge type="primary" text={category.name} key={category.name} />
		);
	});

	const imageProps = useNextSanityImage(sanityClient, featuredImage);

	return (
		<section className={styles.wrapper}>
			<Image
				src={featuredImage}
				{...imageProps}
				alt={featuredImage.alternativeText}
			/>
			{categories && (
				<div className={styles.categoryContainer}>{mapCategories}</div>
			)}
			{title && <Headline tag="h1">{title}</Headline>}
		</section>
	);
};
