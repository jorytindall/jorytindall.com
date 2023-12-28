import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from 'lib/sanity.server';
import { Container } from 'components/layout';
import { Headline, Paragraph } from 'components/typography';
import { getSanityImageUrl } from 'utils/getSanityImage';
import s from 'styles/components/Features.module.scss';

interface FeatureItemProps {
	image: {
		alternativeText: string;
	};
	title: string;
	description: string;
}

export const FeatureItem = ({
	image,
	title,
	description,
}: FeatureItemProps) => {
	// const imageProps = useNextSanityImage(sanityClient, image);

	return (
		<>
			<Container
				isFlex
				flexDirection="column"
				semanticElement="div"
				density="collapse"
				gap="default"
			>
				{image && (
					<div className={s.imageWrapper}>
						<Image
							// @ts-ignore
							src={getSanityImageUrl(image)}
							className={s.imageWrapper}
							alt={image.alternativeText}
							fill
						/>
					</div>
				)}
				{title && (
					<Headline tag="h5" collapse>
						{title}
					</Headline>
				)}
				{description && (
					<Paragraph type="primary" collapse>
						{description}
					</Paragraph>
				)}
			</Container>
		</>
	);
};
