import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_MUSIC_PROJECTS, GET_MUSIC_PROJECT_PATHS } from 'lib/queries';
import { Layout } from 'components/layout'
import { ModuleRenderer } from 'components/module-renderer';
import { PageTitle } from 'components/page-title'
import { MetaHead } from 'components/meta';
import { linkResolver } from 'utils/linkResolver';

export default function MusicProject({ data, preview }) {
	const router = useRouter();

	if (!router.isFallback && !data.musicProject?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { title, description, moduleContent, slug } = data.musicProject;

	return (
		<Layout>
			<MetaHead title={title} description={description} slug={linkResolver('musicProject', slug)} />
			<PageTitle megaTitle={title} />
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
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
