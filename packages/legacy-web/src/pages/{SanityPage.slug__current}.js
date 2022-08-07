import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout';
import { ModuleRenderer } from '../components/moduleRenderer/ModuleRenderer';
import { PageTitle } from '../components/pageTitle';
import { H1 } from '../components/typography';
// import { moduleContentQuery } from '../lib/fragments'

const Page = ({ data }) => {
	const page = data.page;
	return (
		<Layout seo={page}>
			{page.megaHeadline !== null ? (
				<PageTitle title={page.title} megaTitle={page.megaHeadline} />
			) : null}
			{page.megaHeadline === null ? <H1>{page.title}</H1> : null}
			{page.moduleContent && (
				<ModuleRenderer modules={page.moduleContent} />
			)}
		</Layout>
	);
};

export default Page;

export const query = graphql`
	query PageQuery($id: String!) {
		page: sanityPage(id: { eq: $id }) {
			title
			id
			showTitle
			megaHeadline
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
