import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_MUSIC_PROJECTS, GET_MUSIC_PROJECT_PATHS } from 'lib/queries';
import { Layout } from 'components/layout'
import { ModuleRenderer } from 'components/module-renderer';
import { PageTitle } from 'components/page-title'
import { MetaHead } from 'components/meta';
import { Person } from 'components/person';
import { Button } from 'components/button';
import { CenteredWrapper } from 'components/layout';
import { linkResolver } from 'utils/linkResolver';
import { getSanityFileUrl } from 'utils/getSanityFileUrl';
import styles from 'styles/pages/Music.module.scss'

export default function MusicProject({ data, preview }) {
	const router = useRouter();

	if (!router.isFallback && !data.musicProject?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { title, description, moduleContent, slug, musicians, pressKit } = data.musicProject;

	const pressKitUrl = pressKit ? getSanityFileUrl(pressKit.file.asset._ref) : null

	return (
		<Layout>
			<MetaHead title={title} description={description} slug={linkResolver('musicProject', slug)} />
			<PageTitle megaTitle={title} />
			{musicians &&
				<section className={styles.musicians}>
					<div className={styles.inner}>
						{musicians.map(musician => {
							return (
								<Person
									name={musician.name}
									instrument={musician.instrument}
									image={musician.image}
									key={musician.name}
								/>
							)
						})}
					</div>
				</section>
			}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
			{pressKit &&
				<CenteredWrapper semanticElement='div'>
					<Button
						href={pressKitUrl.url}
						isDownload
						isFullWidth
					>Download Press Kit</Button>
				</CenteredWrapper>
			}
		</Layout>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const musicProject = await getClient(preview).fetch(GET_MUSIC_PROJECTS, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { musicProject },
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const paths = await getClient(previewClient).fetch(GET_MUSIC_PROJECT_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}