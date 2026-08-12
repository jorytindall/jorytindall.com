import { BentoBox, BentoItem } from 'components/bento';
import { Headline, Paragraph } from 'components/typography';
import { Badge } from 'components/badge';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { linkResolver } from 'utils/linkResolver';
import styles from './ProjectChapters.module.css';

interface ProjectChapter {
	_id: string;
	title: string;
	slug: string;
	client?: string;
	overview?: string;
	featuredImage?: any;
	galleryImages?: any[];
}

interface ProjectChaptersProps {
	chapters: ProjectChapter[];
	heading?: string;
}

export const ProjectChapters = ({
	chapters,
	heading = 'Case studies in this project',
}: ProjectChaptersProps) => {
	if (!chapters || chapters.length === 0) {
		return null;
	}

	return (
		<BentoBox isFullBleed={false}>
			<Headline
				tag='h2'
				size='h3'
				color='secondary'
				className={styles.heading}
				collapse
			>
				{heading}
			</Headline>
			{chapters.map((chapter) => {
				const galleryImages = chapter.galleryImages;
				const hasGallery = galleryImages && galleryImages.length > 0;

				const images = hasGallery
					? galleryImages
							.map((img: any) => {
								const url = getSanityImageUrl(img);
								return url ? { src: url, alt: img.alternativeText || '' } : null;
							})
							.filter((img): img is { src: string; alt: string } => img !== null)
					: undefined;

				const fallbackImage = !hasGallery
					? getSanityImageUrl(chapter.featuredImage)
					: undefined;

				return (
					<BentoItem
						key={chapter._id}
						background='tertiary'
						size='medium'
						padding='large'
						gap='large'
						isInteractive={true}
						// Absolute path: a relative href would resolve against the current
						// /portfolio/[slug] route and produce /portfolio/portfolio/[slug].
						href={`/${linkResolver('portfolioProject', chapter.slug)}`}
						image={fallbackImage}
						images={images}
						imagePosition='top'
						imageSizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						altText={chapter.featuredImage?.alternativeText}
					>
						<Headline tag='h3' size='h4' color='secondary' collapse>
							{chapter.title}
						</Headline>
						{chapter.overview && (
							<Paragraph collapse>{chapter.overview}</Paragraph>
						)}
						{chapter.client && <Badge text={chapter.client} type='inverse' />}
					</BentoItem>
				);
			})}
		</BentoBox>
	);
};
