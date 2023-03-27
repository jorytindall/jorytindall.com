import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_MUSIC_PROJECTS, GET_MUSIC_PROJECT_PATHS } from 'lib/queries';
import { Layout } from 'components/layout'

export default function MusicProject({ data, preview }) {
	const router = useRouter();

	if (!router.isFallback && !data.musicProject?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { title } = data.musicProject;

	return (
		<Layout>
			<h1>{title}</h1>
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
