import { sanityClient } from 'lib/sanity/sanityClient';
import {
	GET_PORTFOLIO_PROJECTS,
	GET_PORTFOLIO_PROJECT_PATHS,
} from 'lib/queries';
import { HeroImage, Title } from 'app/components/portfolio';
import { ModuleRenderer } from 'app/components/module-renderer';
import { BentoBox } from 'app/components/bento';
import { PortfolioTitle } from '../PortfolioTitle';

// Generate Metadata
export async function generateMetadata({ params }) {
	const { slug } = params;
	const client = sanityClient;
	const portfolioProject = await client.fetch(GET_PORTFOLIO_PROJECTS, {
		slug,
	});

	return {
		title: `${portfolioProject.title} | Jory Tindall`,
	};
}

// Generate static data
export async function generateStaticParams() {
	const client = sanityClient;
	const slugs = await client.fetch(GET_PORTFOLIO_PROJECT_PATHS, {
		next: {
			revalidate: 60,
		},
	});
	return slugs.map((slug) => ({ slug }));
}

export default async function PortfolioProject({ params }) {
	const { slug } = params;
	const portfolioProject = await sanityClient.fetch(GET_PORTFOLIO_PROJECTS, {
		slug,
	});

	const {
		title,
		overview,
		timeline,
		types,
		externalLink,
		roles,
		client,
		tools,
		featuredImage,
		moduleContent
	} = portfolioProject;

	return (
		<>
			{title &&
				<PortfolioTitle
					title={title}
					overview={overview}
					timeline={timeline}
					types={types}
					externalLink={externalLink}
					roles={roles}
					client={client}
					tools={tools}
				/>
			}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</>
	);
}
