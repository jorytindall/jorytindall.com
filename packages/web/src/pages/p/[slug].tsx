import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_LANDING_PAGES, GET_LANDING_PAGE_PATHS } from 'lib/queries';

export default function LandingPage({ data, preview }) {
	const router = useRouter();


	if (!router.isFallback && !data.landingPage?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { title } = data.landingPage;

	return (
		<>
			<h1>{title}</h1>
		</>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const landingPage = await getClient(preview).fetch(GET_LANDING_PAGES, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { landingPage },
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const paths = await getClient(previewClient).fetch(GET_LANDING_PAGE_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
