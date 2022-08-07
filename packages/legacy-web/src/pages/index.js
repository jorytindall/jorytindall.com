import React from 'react';
import { Link } from 'gatsby';
import { Layout } from '../components/layout';
import { H2, H4, Paragraph } from '../components/typography';
import { TextArrow } from '../components/button';

// Local
import { MainContent } from '../components/home';

const Homepage = () => {
	const seo = {
		title: `Designer, musician, and educator`,
		description: `Home of designer, musician, and educator Jory Tindall.`,
	};

	return (
		<Layout seo={seo}>
			<MainContent>
				<H2 color="var(--color-primary-main)">
					Hey 🤘 My name is Jory Tindall.
				</H2>
				<H4 color="var(--color-primary-main)">
					I'm an empathetic interface and experience designer with
					passions for system-thinking and design systems, design
					technology, and shredding the saxophone. I'm currently based
					in Seattle, Washington.
				</H4>
				<Paragraph>
					I'm currently helping to empower a broad range of designers
					and creative thinkers on the Global Design System team at{' '}
					<a href="https://www.t-mobile.com/" target="blank">
						T-Mobile
					</a>
					.
				</Paragraph>
				<Paragraph>
					You can also find me leading the charge to democratize music
					education at{' '}
					<a href="https://downbeatacademy.com" target="blank">
						Downbeat Academy
					</a>
					, collaborating in the Seattle music scene, and teaching
					teaching music to the next generation of shredders.
				</Paragraph>
				<TextArrow text="View my portfolio" link="/portfolio" />
			</MainContent>
			<MainContent>
				<H2 color="var(--color-primary-main)">Want to know more?</H2>
				<Paragraph>
					<Link to="/contact">Drop me a line,</Link> I'm always
					looking to meet new people and start up new collaborations.
				</Paragraph>
			</MainContent>
		</Layout>
	);
};

export default Homepage;
