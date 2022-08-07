import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { H4, Paragraph } from '../typography';
import { TextArrow } from '../button';

export const PostWrapper = ({ title, excerpt, link }) => {
	return (
		<Wrapper>
			<Link to={`/blog/${link}`}>
				<H4>{title}</H4>
				<Paragraph>{excerpt}</Paragraph>
				<TextArrow text="Read more" />
			</Link>
		</Wrapper>
	);
};

const Wrapper = styled.article`
	padding: 2.5rem;
	background: var(--color-tertiary-medium-tint);
	margin: 2.5rem 0;
	transition: all 0.15s ease-in-out;

	&:hover {
		cursor: pointer;
		transform: translateY(-4px);
		background: var(--color-primary-main);

		& a > * {
			color: var(--color-accent-01);
		}
	}

	a {
		text-decoration: none;
	}
`;
