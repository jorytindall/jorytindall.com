import { sanityClient } from 'lib/sanity/config';
import { GET_MUSIC_PROJECTS, GET_MUSIC_PROJECT_PATHS } from 'lib/queries';
import { ModuleRenderer } from 'components/module-renderer';
import { PageTitle } from 'components/page-title';
import { Person } from 'components/person';
import { Button } from 'components/button';
import { CenteredWrapper } from 'components/layout';
import { getSanityFileUrl } from 'utils/getSanityFileUrl';
import styles from '../Music.module.css';

// Revalidate pages every 60 seconds
export const revalidate = 60;

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const client = sanityClient;
	const page = await client.fetch(GET_MUSIC_PROJECTS, {
		slug,
	});

	return {
		title: `${page.title} | Jory Tindall`,
	};
}

export async function generateStaticParams() {
	const client = sanityClient;
	const slugs = await client.fetch(GET_MUSIC_PROJECT_PATHS);
	return slugs.map((slug) => ({ slug }));
}

export default async function MusicProject({ params }) {
	const { slug } = await params;
	const page = await sanityClient.fetch(GET_MUSIC_PROJECTS, { slug });

	const { title, moduleContent, musicians, pressKit } = page;

	const pressKitUrl = pressKit
		? getSanityFileUrl(pressKit.file.asset._ref)
		: null;

	return (
		<>
			<PageTitle megaTitle={title} />
			{musicians && (
				<section className={styles.musicians}>
					<div className={styles.inner}>
						{musicians.map((musician) => {
							return (
								<Person
									name={musician.name}
									instrument={musician.instrument}
									image={musician.image}
									key={musician.name}
								/>
							);
						})}
					</div>
				</section>
			)}
			{pressKit && (
				<CenteredWrapper
					semanticElement="div"
					collapseY
				>
					<Button
						// @ts-ignore
						href={pressKitUrl.url}
						isDownload
						isFullWidth
					>
						Download Press Kit
					</Button>
				</CenteredWrapper>
			)}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</>
	);
}
