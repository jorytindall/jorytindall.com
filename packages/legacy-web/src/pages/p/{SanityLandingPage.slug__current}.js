import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../../components/layout';
import { H1 } from '../../components/typography';

const LandingPage = ({ data }) => {
	const landingPage = data.landingPage;
	return (
		<Layout>
			<H1>{landingPage.title}</H1>
		</Layout>
	);
};

export default LandingPage;

export const query = graphql`
	query LandingPageQuery($id: String!) {
		landingPage: sanityLandingPage(id: { eq: $id }) {
			title
			id
			slug {
				current
			}
		}
	}
`;
