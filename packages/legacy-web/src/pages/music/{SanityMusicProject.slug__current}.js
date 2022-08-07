import React from 'react';
import { graphql } from 'gatsby';

// Components
import { Layout } from '../../components/layout';
import { ModuleRenderer } from '../../components/moduleRenderer/ModuleRenderer';
import { PageTitle } from '../../components/pageTitle';

const Music = ({ data }) => {
	const { title, moduleContent } = data.musicProject;
	return (
		<Layout seo={data.musicProject}>
			{title && <PageTitle megaTitle={title} />}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</Layout>
	);
};

export default Music;

export const query = graphql`
	query MusicQuery($id: String!) {
		musicProject: sanityMusicProject(id: { eq: $id }) {
			title
			id
			slug {
				current
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
