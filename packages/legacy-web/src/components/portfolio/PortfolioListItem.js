import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { H4, Paragraph } from '../typography';

export default function PortfolioListItem({ input }) {
	console.log(input);

	return (
		<Wrapper>
			{input.items.map((item) => {
				return (
					<ItemWrapper key={item.item._key}>
						<StyledLink to={`/portfolio/${item.item.slug.current}`}>
							<GatsbyImage
								image={
									item.item.featuredImage.asset
										.gatsbyImageData
								}
								alt={item.item.featuredImage.alternativeText}
								layout="constrained"
							/>
							<H4 margin="1rem 0 0 0">{item.item.title}</H4>
							<Paragraph primary margin="0">
								{item.item.client}
							</Paragraph>
						</StyledLink>
					</ItemWrapper>
				);
			})}
		</Wrapper>
	);
}

const Wrapper = styled.section`
	padding: 2.5rem;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
	gap: 5rem;

	@media (max-width: 1400px) {
		gap: 2.5rem;
		grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
	}

	@media (max-width: 1000px) {
		padding: 2.5rem 1rem;
	}

	@media (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;

const ItemWrapper = styled.article`
	text-decoration: none;
	cursor: url('/emojis/fire.png'), pointer;
	transition: all 250ms cubic-bezier(0.77, 0, 0.175, 1);

	&:hover {
		transform: translateY(-0.5rem);
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	cursor: url('/emojis/fire.png'), pointer;
`;
