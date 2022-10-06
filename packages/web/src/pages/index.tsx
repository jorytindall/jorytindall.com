import { MetaHead } from 'components/meta';
import { Headline, Paragraph, InlineLink } from 'components/typography';
import { TextArrow } from 'components/button';
import styles from 'styles/pages/Home.module.scss';

export default function Home() {
	return (
		<>
			<MetaHead
				title="Designer, saxophonist artist, and educator"
				description="Home of Jory Tindall; User experience designer, saxophone artist, and music educator based in Seattle, Washington."
			/>
			<section className={styles.mainContent}>
				<article>
					<Headline type="h2">
						Hey 🤘 My name is Jory Tindall.
					</Headline>
					<Headline type="h4">
						I'm an empathetic interface and experience designer with
						passions for system-thinking and design systems, design
						technology, and shredding the saxophone, currently based
						in Seattle, Washington.
					</Headline>
					<Paragraph>
						I'm currently helping to empower a broad range of
						designers and creative thinkers on the Design System
						team at{' '}
						<InlineLink
							type="external"
							target="_blank"
							href="https://hashicorp.com"
						>
							HashiCorp,
						</InlineLink>{' '}
						previously at the{' '}
						<InlineLink
							type="external"
							target="_blank"
							href="https://t-mobile.com"
						>
							T-Mobile Design System team.
						</InlineLink>
					</Paragraph>
					<Paragraph>
						You can also find me leading the charge to democratize
						music education at{' '}
						<InlineLink
							href="https://downbeatacademy.com"
							type="external"
							target="_blank"
						>
							Downbeat Academy
						</InlineLink>
						, collaborating in the Seattle music scene, and teaching
						teaching music to the next generation of shredders.
					</Paragraph>
					<TextArrow href="portfolio">View my portfolio</TextArrow>
				</article>
				<article>
					<Headline type="h3">Want to know more?</Headline>
					<Paragraph>
						<InlineLink type="internal" href="contact">
							Drop me a line,
						</InlineLink>{' '}
						I'm always looking to meet new people and start up new
						collaborations.
					</Paragraph>
				</article>
			</section>
		</>
	);
}

export async function getStaticProps() {
	return {
		props: {},
	};
}
