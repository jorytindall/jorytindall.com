import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { getGatsbyImageData } from 'gatsby-source-sanity';
import { Paragraph } from '../typography';

export const InlineImage = ({ input }) => {
	const { alternativeText, caption, asset } = input;
	console.log(asset);

	const sanityConfig = { projectId: `j9ccckrc`, dataset: `production` };
	const imageData = getGatsbyImageData(
		asset._id,
		{ maxWidth: 1200 },
		sanityConfig
	);

	return (
		<Wrapper>
			<GatsbyImage image={imageData} alt={alternativeText} />
			<Paragraph
				secondary
				margin="0.25rem 0"
				color="var(--color-accent-05)"
			>
				{caption}
			</Paragraph>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin: 2.5rem 0;
	/* grid-column: 1 / 4; */
	width: 100%;
`;
