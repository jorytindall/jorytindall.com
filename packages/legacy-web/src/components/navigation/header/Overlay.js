import React from 'react';
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';

import { H5 } from '../../typography';
import { FeaturedItem } from './FeaturedItem';

const Overlay = ({ overlay }) => {
	const data = useStaticQuery(graphql`
		{
			allSanityPortfolioProject(filter: { isFeatured: { eq: true } }) {
				edges {
					node {
						featuredImage {
							alternativeText
							asset {
								gatsbyImageData(
									width: 400
									height: 250
									fit: FILL
									layout: FIXED
									placeholder: BLURRED
									formats: [AUTO, WEBP]
								)
							}
						}
						_key
						_id
						client
						title
						slug {
							current
						}
					}
				}
			}
		}
	`);

	return (
		<Wrapper overlay={overlay}>
			<LinkWrapper>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/portfolio/">Portfolio</NavLink>
				<NavLink to="/events">Events</NavLink>
				<NavLink to="/blog">Blog</NavLink>
				<NavLink to="/contact">Contact</NavLink>
			</LinkWrapper>
			<FeaturedWrapper>
				<H5 color="var(--color-primary-shade)">Selected work</H5>
				<div>
					{data.allSanityPortfolioProject.edges.map((project) => {
						return (
							<FeaturedItem
								key={project.node._id}
								title={project.node.title}
								client={project.node.client}
								image={
									project.node.featuredImage.asset
										.gatsbyImageData
								}
								alternativeText={
									project.node.featuredImage.alternativeText
								}
								url={project.node.slug.current}
							/>
						);
					})}
				</div>
			</FeaturedWrapper>
		</Wrapper>
	);
};

export default Overlay;

const Wrapper = styled.div`
	width: 100vw;
	height: calc(100vh - 124px);
	visibility: hidden;
	padding: 2.5rem 2rem 2rem 2rem;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 124px;
	left: 0;
	box-sizing: border-box;
	background: #fff;

	${(props) =>
		props.overlay &&
		`
        visibility: visible;

        @media (max-width: var(--breakpoint-md)) {
            top: 89px;
        }`}
`;

const LinkWrapper = styled.aside`
	padding: 0 2rem;
	display: flex;
	flex-direction: column;
	text-align: right;
	align-self: flex-end;
	flex-grow: 1;

	@media (max-width: 768px) {
		padding: 0 1rem;
	}
`;

const NavLink = styled(Link)`
	font-family: var(--font-headline);
	font-size: 75px;
	font-weight: bold;
	line-height: 75px;
	color: var(--color-primary-main);
	text-decoration: none;
	transition: color 150ms cubic-bezier(0.78, 0.01, 0.51, 0.99),
		transform 150ms cubic-bezier(0.78, 0.01, 0.51, 0.99);
	margin: 0.25rem 0;
	display: block;
	transform: none;

	&:hover {
		color: var(--color-primary-medium-tint);
		transform: translateX(-0.5rem);
	}
	&:active {
		color: var(--color-primary-shade);
	}
`;

const FeaturedWrapper = styled.section`
	align-self: flex-start;
	overflow: hidden;
	padding: 1rem 0;
	width: 100%;

	div {
		width: 2000px;
		overflow-x: scroll;
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
	}
`;
