import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

export const FullWidthImage = ({ input }) => {
	const { image, alternativeText } = input;

	console.log(input);

	return (
		<StyledGatsbyImage
			image={image.asset.gatsbyImageData}
			alt={alternativeText}
			layout="fullWidth"
		/>
	);
};

const StyledGatsbyImage = styled(GatsbyImage)`
	margin: 1rem 0;
`;
