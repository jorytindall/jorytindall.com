import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

// Components
import { Paragraph, InternalLink, ExternalLink } from '../../typography';

const Footer = () => {
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
		<Wrapper>
			<Content>
				<div>
					<Link to="/">
						<StyledGatsbyImage
							image={data.file.childImageSharp.gatsbyImageData}
							alt="Logo"
							width={60}
							height={60}
							layout="fixed"
							placeholder="blurred"
						/>
					</Link>
					<Paragraph margin="1rem 0 0 0">
						Copyright &copy; Jory Tindall {new Date().getFullYear()}
					</Paragraph>
				</div>
				<div>
					<InternalLink
						to="/about"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						About
					</InternalLink>
					<InternalLink
						to="/portfolio"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						Portfolio
					</InternalLink>
					<InternalLink
						to="/blog"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						Blog
					</InternalLink>
					<InternalLink
						to="/resume"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						Resume
					</InternalLink>
					<InternalLink
						to="/contact"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						Contact
					</InternalLink>
				</div>
				<div>
					<ExternalLink
						href="https://www.behance.net/jorytindall"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						Behance
					</ExternalLink>
					<ExternalLink
						href="https://www.linkedin.com/in/jory-tindall/"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						LinkedIn
					</ExternalLink>
					<ExternalLink
						href="https://www.facebook.com/jorytindall.musician"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						Facebook
					</ExternalLink>
					<ExternalLink
						href="https://www.instagram.com/jorytindall/"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						Instagram
					</ExternalLink>
					<ExternalLink
						href="https://twitter.com/JoryTindall"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						Twitter
					</ExternalLink>
					<ExternalLink
						href="https://www.github.com/jorytindall"
						margin="16px 0"
						color="var(--color-dark-main)"
					>
						GitHub
					</ExternalLink>
				</div>
			</Content>
		</Wrapper>
	);
};

export default Footer;

const Wrapper = styled.footer`
	background: var(--color-accent-01);
	max-width: 100vw;
	display: flex;
	justify-content: center;
`;

const Content = styled.div`
	width: 1440px;
	padding: 2.5rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-areas: 'copyright copyright col1 col2';

	div:nth-child(1) {
		grid-area: copyright;
	}

	div:nth-child(2) {
		grid-area: col1;
	}

	div:nth-child(3) {
		grid-area: col2;
	}

	div:nth-child(2),
	div:nth-child(3) {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas:
			'copyright copyright'
			'col1 col2';
		padding: 2.5rem 1rem;
		div:nth-child(1) {
			margin-bottom: 2.5rem;
		}
	}
`;

const StyledGatsbyImage = styled(GatsbyImage)`
	box-shadow: 0px 0px 12px rgba(22, 15, 41, 0.15);
	border-radius: 50%;
	border: 3px solid var(--color-primary-main);
	cursor: url('/emojis/cool.png'), pointer;
`;
