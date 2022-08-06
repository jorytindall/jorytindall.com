import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Paragraph } from '../../typography';

export const FeaturedItem = ({
	title = 'Title',
	client = 'Client',
	image,
	alternativeText = 'Portfolio item',
	url = '#',
}) => {
	return (
		<Wrapper to={`/portfolio/${url}`}>
			<GatsbyImage
				image={image}
				alt={alternativeText}
				height={250}
				width={400}
			/>
			<Paragraph margin="0">{title}</Paragraph>
			<Paragraph secondary margin="0" color="var(--color-primary-shade)">
				<strong>{client}</strong>
			</Paragraph>
		</Wrapper>
	);
};

const Wrapper = styled(Link)`
	width: 400px;
	text-decoration: none;

	${Paragraph} {
		text-decoration: none;
	}
`;
