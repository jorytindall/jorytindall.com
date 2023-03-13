import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscriptionHook } from 'lib/sanity';
import { getClient, previewClient } from 'lib/sanity.server';
import {
	GET_PORTFOLIO_PROJECTS,
	GET_PORTFOLIO_PROJECT_PATHS,
} from 'lib/queries';
import { ModuleRenderer } from 'components/module-renderer';
import { HeroImage, Title } from 'components/portfolio';
import { MetaHead } from 'components/meta';
import { Layout } from 'components/layout'
import { linkResolver } from 'utils/linkResolver';

export default function PortfolioProject({ data, preview }) {
	const router = useRouter();

	// const { data: portfolioProject } = usePreviewSubscriptionHook(
	// 	GET_PORTFOLIO_PROJECTS,
	// 	{
	// 		params: { slug: data.portfolioProject?.slug },
	// 		initialData: data.portfolioProject,
	// 		enabled: preview && data.portfolioProject?.slug,
	// 	}
	// );

	if (!router.isFallback && !data.portfolioProject?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { title, featuredImage, moduleContent, slug } = data.portfolioProject;

	return (
		<Layout>
			<MetaHead
				title={title}
				slug={linkResolver('portfolioProject', slug)}
			/>
			{featuredImage.asset && (
				<HeroImage
					source={featuredImage.asset}
					altText={featuredImage.alternativeText}
				/>
			)}
			{title && <Title input={data.portfolioProject} />}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</Layout>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const portfolioProject = await getClient(preview).fetch(
		GET_PORTFOLIO_PROJECTS,
		{
			slug: params.slug,
		}
	);

	return {
		props: {
			preview,
			data: { portfolioProject },
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const paths = await getClient(previewClient).fetch(
		GET_PORTFOLIO_PROJECT_PATHS
	);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
