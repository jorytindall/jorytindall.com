import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const HeroImage = ({ source, altText = 'Alternative Text' }) => {
	return <ImageWrapper image={source} alt={altText} />;
};

export default HeroImage;

const ImageWrapper = styled(GatsbyImage)`
	max-width: 100vw;
	position: relative;
	top: -124px;
	margin-bottom: -124px;

	@media (max-width: 1000px) {
		top: -164px;
		margin-bottom: -164px;
	}

	@media (max-width: 550px) {
		top: -124px;
		margin-bottom: -124px;
	}
`;
