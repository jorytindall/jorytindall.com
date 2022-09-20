import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscriptionHook } from 'lib/sanity';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_PAGES, GET_PAGE_PATHS } from 'lib/queries';
import { PageTitle } from 'components/page-title';
import { Headline } from 'components/typography';
import { ModuleRenderer } from 'components/module-renderer';

export default function Page({ data, preview }) {
	const router = useRouter();

	const { data: page } = usePreviewSubscriptionHook(GET_PAGES, {
		params: { slug: data.page?.slug },
		initialData: data.page,
		enabled: preview && data.page?.slug,
	});

	if (!router.isFallback && !data.page?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { title, megaHeadline, showTitle, moduleContent } = page;

	console.log(moduleContent)

	return (
		<>
			{page.megaHeadline !== null ? (
				<PageTitle title={title} megaTitle={megaHeadline} />
			) : null}
			{megaHeadline === null ? (
				<Headline type="h1">{title}</Headline>
			) : null}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</>
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
	};
}

export async function getStaticPaths() {
	const paths = await getClient(previewClient).fetch(GET_PAGE_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
