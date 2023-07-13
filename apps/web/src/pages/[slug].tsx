import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_PAGES, GET_PAGE_PATHS } from 'lib/queries';
import { PageTitle } from 'components/page-title';
import { Headline } from 'components/typography';
import { ModuleRenderer } from 'components/module-renderer';
import { MetaHead } from 'components/meta';
import { linkResolver } from 'utils/linkResolver';
import { Layout } from 'components/layout'

export default function Page({ data, preview }) {
	const router = useRouter();

	if (!router.isFallback && !data.page?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { title, megaHeadline, showTitle, moduleContent, slug } = data.page;

	return (
		<Layout>
			<MetaHead title={title} slug={linkResolver('page', slug)} />
			{data.page.megaHeadline !== null ? (
				<PageTitle title={title} megaTitle={megaHeadline} />
			) : null}
			{megaHeadline === null ? (
				<Headline tag="h1">{title}</Headline>
			) : null}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</Layout>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const page = await getClient(preview).fetch(GET_PAGES, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { page },
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const paths = await getClient(previewClient).fetch(GET_PAGE_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}