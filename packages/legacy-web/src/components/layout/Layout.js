import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { motion } from 'framer-motion';
import SimpleReactLightbox from 'simple-react-lightbox';
import GlobalStyle from '../../styles/GlobalStyle';
import Seo from '../meta';
import { Header, Footer } from '../navigation';
import { Banner } from '../banner/Banner';

const Wrapper = styled(motion.main)`
	min-height: 100vh;
	background: var(--color-tertiary-light-tint);
	display: flex;
	flex-direction: column;
	gap: 0;
	padding-bottom: 2.5rem;

	@media (max-width: 1000px) {
		padding-top: 2.5rem;
	}

	@media (max-width: 550px) {
		padding-top: 0rem;
	}
`;

const Layout = ({ children, seo }) => {
	const data = useStaticQuery(
		graphql`
			query {
				sanityBanner {
					active
					_rawContent(resolveReferences: { maxDepth: 5 })
				}
			}
		`
	);

	return (
		<SimpleReactLightbox>
			<GlobalStyle />
			<Seo data={seo} />
			{data.sanityBanner.active && (
				<Banner content={data.sanityBanner._rawContent} />
			)}
			<Header />
			<Wrapper
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.25 }}
			>
				{children}
			</Wrapper>
			<Footer />
		</SimpleReactLightbox>
	);
};

export default Layout;
