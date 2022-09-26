import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscriptionHook } from 'lib/sanity';
import { getClient, previewClient } from 'lib/sanity.server';
import {
	GET_PORTFOLIO_PROJECTS,
	GET_PORTFOLIO_PROJECT_PATHS,
} from 'lib/queries';
import { ModuleRenderer } from 'components/module-renderer'
import { HeroImage, Title } from 'components/portfolio'

export default function PortfolioProject({ data, preview }) {
	const router = useRouter();

	const { data: portfolioProject } = usePreviewSubscriptionHook(
		GET_PORTFOLIO_PROJECTS,
		{
			params: { slug: data.portfolioProject?.slug },
			initialData: data.portfolioProject,
			enabled: preview && data.portfolioProject?.slug,
		}
	);

	if (!router.isFallback && !data.portfolioProject?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { 
		title,
		featuredImage,
		moduleContent,
	} = portfolioProject;

	console.log(featuredImage)

	return (
		<>
			{featuredImage.asset &&			
				<HeroImage
					source={featuredImage.asset.url}
					altText={featuredImage.alternativeText}
				/>
			}
			{title &&
				<Title
					{...portfolioProject}
				/>
			}
			{moduleContent &&
				<ModuleRenderer modules={moduleContent} />
			}
		</>
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
