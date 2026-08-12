import { notFound } from 'next/navigation';
import { sanityClient } from 'lib/sanity/config';
import {
	GET_PORTFOLIO_PROJECTS,
	GET_PORTFOLIO_PROJECT_PATHS,
} from 'lib/queries';
import { ModuleRenderer } from 'components/module-renderer';
import { PortfolioTitle } from 'components/portfolio/PortfolioTitle';
import { ProjectChapters } from 'components/portfolio/ProjectChapters';
import { PasswordGate } from 'components/password-gate';
import { hasPortfolioAccess } from 'lib/auth/portfolioAccess';

// Revalidate portfolio every minute
export const revalidate = 60;

// Generate Metadata
export async function generateMetadata({ params }) {
	const { slug } = await params;
	const client = sanityClient;
	const portfolioProject = await client.fetch(GET_PORTFOLIO_PROJECTS, {
		slug,
	});

	if (!portfolioProject?.title) {
		return { title: `Portfolio | Jory Tindall` };
	}

	return {
		title: `${portfolioProject.title} | Jory Tindall`,
	};
}

// Generate static data
export async function generateStaticParams() {
	const client = sanityClient;
	const slugs = await client.fetch(GET_PORTFOLIO_PROJECT_PATHS);
	return slugs.map((slug) => ({ slug }));
}

export default async function PortfolioProject({ params }) {
	const { slug } = await params;
	const portfolioProject = await sanityClient.fetch(GET_PORTFOLIO_PROJECTS, {
		slug,
	});

	// An unresolvable slug would otherwise throw on destructuring below.
	if (!portfolioProject) {
		notFound();
	}

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
		moduleContent,
		isPasswordProtected,
		parentProject,
		chapters,
	} = portfolioProject;

	// Check if content is password protected and user has access
	if (isPasswordProtected) {
		const hasAccess = await hasPortfolioAccess();
		if (!hasAccess) {
			return <PasswordGate title={title} />;
		}
	}

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
					parentProject={parentProject}
					image={featuredImage}
				/>
			}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
			{chapters?.length > 0 && <ProjectChapters chapters={chapters} />}
		</>
	);
}
