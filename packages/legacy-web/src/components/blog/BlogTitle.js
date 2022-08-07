import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { H1 } from '../typography';
import { Badge } from '../badge';

export const BlogTitle = ({ featuredImage, title, categories }) => {
	const mapCategories = categories.map((category) => {
		return <Badge type="secondary" text={category.name} />;
	});

	return (
		<Wrapper>
			<GatsbyImage
				image={featuredImage.asset.gatsbyImageData}
				alt={featuredImage.alternativeText}
				layout="constrained"
				objectFit="contain"
			/>
			{categories && (
				<CategoryContainer>{mapCategories}</CategoryContainer>
			)}
			{title && <H1 textAlign="center">{title}</H1>}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	max-width: 50vw;
	justify-content: center;
	margin: 0 auto;
	gap: 1rem;
	padding: 0 1rem;

	@media (max-width: 1200px) {
		max-width: 75vw;
	}

	@media (max-width: 768px) {
		max-width: 100vw;
	}
`;

const CategoryContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 0.5rem;
`;
