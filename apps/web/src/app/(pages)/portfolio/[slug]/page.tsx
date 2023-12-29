import { sanityClient } from "lib/sanity/sanityClient";
import { GET_PORTFOLIO_PROJECTS, GET_PORTFOLIO_PROJECT_PATHS } from "lib/queries";
import { HeroImage, Title } from 'app/components/portfolio';
import { ModuleRenderer } from 'app/components/module-renderer';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const client = sanityClient
  const portfolioProject = await client.fetch(GET_PORTFOLIO_PROJECTS, {
    slug
  })

  return {
    title: `${portfolioProject.title} | Jory Tindall`,
  }
}

export async function generateStaticParams() {
  const client = sanityClient
  const slugs = await client.fetch(
    GET_PORTFOLIO_PROJECT_PATHS,
    { 
      next: {
        revalidate: 60,
      },
    }
  )
  return slugs.map((slug) => ({ slug }));
}

export default async function PortfolioProject({ params }) {
  const { slug } = params
  const portfolioProject = await sanityClient.fetch(GET_PORTFOLIO_PROJECTS, { slug })

  const { title, featuredImage, moduleContent } = portfolioProject;

  return (
    <>
      {featuredImage.asset && (
        <HeroImage
          source={featuredImage.asset}
          altText={featuredImage.alternativeText}
        />
      )}
      {title && <Title input={portfolioProject} />}
      {moduleContent && <ModuleRenderer modules={moduleContent} />}
    </>
  )
}