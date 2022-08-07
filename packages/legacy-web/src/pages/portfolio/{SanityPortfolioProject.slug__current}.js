import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

// Components
import { Layout } from '../../components/layout';
import { ModuleRenderer } from '../../components/moduleRenderer/ModuleRenderer';
import { HeroImage, Title } from '../../components/portfolio';

const Portfolio = ({ data }) => {
	const project = data.project;
	return (
		<Layout seo={project}>
			<Helmet>
				<meta
					property="og:image"
					content={project.shareImage.asset.url}
				/>
			</Helmet>
			<HeroImage
				source={project.featuredImage.asset.gatsbyImageData}
				altText={project.featuredImage.alternativeText}
			/>
			<Title
				title={project.title}
				client={project.client}
				projectTypes={project.types}
				roles={project.roles}
				tools={project.tools}
				timeline={project.timeline}
				overview={project.overview}
				link={project.externalLink}
			/>
			{project.moduleContent && (
				<ModuleRenderer modules={project.moduleContent} />
			)}
		</Layout>
	);
};

export default Portfolio;

export const query = graphql`
	query PortfolioProjectsQuery($id: String!) {
		project: sanityPortfolioProject(id: { eq: $id }) {
			title
			client
			tools
			timeline
			types
			overview
			externalLink
			id
			roles
			shareImage {
				asset {
					url
				}
			}
			slug {
				current
			}
			featuredImage {
				alternativeText
				asset {
					gatsbyImageData(
						width: 2000
						placeholder: BLURRED
						fit: FILLMAX
					)
				}
			}
			moduleContent {
				... on SanityRichText {
					...RichText
				}
				... on SanityPortfolioList {
					...PortfolioList
				}
				... on SanityForm {
					...Form
				}
				... on SanityGallery {
					...Gallery
				}
			}
		}
	}
`;
