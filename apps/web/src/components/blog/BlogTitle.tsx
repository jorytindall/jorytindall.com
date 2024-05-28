import Image from 'next/image';
import { Badge } from 'components/badge';
import { Headline } from 'components/typography';
import { getSanityImageUrl } from 'utils/getSanityImage';
import s from 'styles/components/blog/BlogTitle.module.scss';

interface BlogTitleProps {
	featuredImage: {
		alternativeText?: string;
	};
	title: string;
	categories: [
		category: {
			name: string;
		},
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

	return (
		<section className={s.wrapper}>
			<div className={s.imageWrapper}>
				<Image
					// @ts-ignore
					src={getSanityImageUrl(featuredImage)}
					// @ts-ignore
					alt={featuredImage.alternativeText}
					fill
				/>
			</div>
			{categories && (
				<div className={s.categoryContainer}>{mapCategories}</div>
			)}
			{title && <Headline tag="h1">{title}</Headline>}
		</section>
	);
};
