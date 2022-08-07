import React, { useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

// Local
import Burger from './Burger';
import Overlay from './Overlay';

const Header = () => {
	const [overlay, toggle] = useState(false);

	const data = useStaticQuery(graphql`
		{
			file(relativePath: { eq: "avatar-logo.png" }) {
				childImageSharp {
					gatsbyImageData(
						width: 60
						height: 60
						placeholder: DOMINANT_COLOR
						layout: FIXED
						quality: 90
						formats: [AUTO, WEBP]
					)
				}
			}
		}
	`);

	return (
		<Wrapper overlay={overlay}>
			<Link to="/">
				{/* <LogoSymbol color="var(--color-primary-main)" maxWidth="32px" /> */}
				<StyledGatsbyImage
					image={data.file.childImageSharp.gatsbyImageData}
					alt="Logo"
					width={60}
					height={60}
					layout="fixed"
					placeholder="blurred"
					overlay={overlay}
				/>
			</Link>
			<Burger overlay={overlay} toggle={toggle} />
			<Overlay overlay={overlay} />
		</Wrapper>
	);
};

export default Header;

const Wrapper = styled.header`
	position: sticky;
	background: var(--color-tertiary-light-tint);
	background: transparent;
	top: 0;
	z-index: 10;
	max-width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 2.5rem;
	box-sizing: border-box;
	flex-wrap: wrap;

	@media (max-width: 768px) {
		padding: 2rem 1rem;
	}

	${(props) =>
		props.overlay &&
		`
        background: var(--color-accent-01);
        height: inherit;
    `}
`;

const StyledGatsbyImage = styled(GatsbyImage)`
	box-shadow: 0px 0px 12px rgba(22, 15, 41, 0.15);
	border-radius: 50%;
	border: 3px solid var(--color-primary-main);
	cursor: url('/emojis/cool.png'), pointer;

	${(props) =>
		props.overlay &&
		`
        box-shadow: none;
    `}
`;
