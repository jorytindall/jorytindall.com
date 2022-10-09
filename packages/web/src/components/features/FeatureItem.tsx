import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from 'lib/sanity.server';
import { Container } from 'components/layout';
import { Headline, Paragraph } from 'components/typography';
import styles from 'styles/components/Features.module.scss';

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
	const imageProps = useNextSanityImage(sanityClient, image);

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
					<Image
						{...imageProps}
						layout="intrinsic"
						className={styles.imageWrapper}
						alt={image.alternativeText}
					/>
				)}
				{title && (
					<Headline type="h5" collapse>
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
