import { sanityClient } from 'lib/sanity/sanityClient';
import { GET_ALL_MUSIC_PROJECTS } from 'lib/queries';
import { PageTitle } from 'app/components/page-title';
import { linkResolver } from 'utils/linkResolver';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { BentoBox, BentoItem } from 'app/components/bento';
import { Headline, Paragraph } from 'app/components/typography';
import styles from 'styles/pages/Music.module.scss';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Music | Jory Tindall',
	description: 'Music projects, ensembles, and current working groups.',
};

export default async function MusicPage() {
	const musicProjects = await sanityClient.fetch(GET_ALL_MUSIC_PROJECTS);

	const musicItems = musicProjects.map((musicProject) => {

		const { title, slug, description } = musicProject;
		const image = getSanityImageUrl(musicProject.image.asset._ref);
		const link = linkResolver('musicProject', slug);


		return (
			<BentoItem
				key={title}
				background='tertiary'
				size='medium'
				padding='large'
				gap='default'
				isInteractive={true}
				href={link}
				image={image}
				imagePosition="top"
			>
				<Headline tag='h2' size='h4' color='secondary' collapse>{musicProject.title}</Headline>
				<Paragraph>{description}</Paragraph>
			</BentoItem>
		);
	});

	return (
		<>
			<PageTitle title="🎵 Music" megaTitle="Music projects" />
			<BentoBox
				className={styles.wrapper}
				isFullBleed={false}
			>
				{musicItems}
			</BentoBox>
		</>
	);
}
