import { MetaHead } from 'components/meta';
import { Headline, Paragraph, InlineLink } from 'components/typography';
import { TextArrow } from 'components/button';
import { Layout } from 'components/layout'
import styles from 'styles/pages/Home.module.scss';
import { BentoBox,BentoItem } from 'components/bento';

export default function Home() {
	return (
		<Layout>
			<MetaHead
				title="Designer, saxophonist artist, and educator"
				description="Home of Jory Tindall; User experience designer, saxophone artist, and music educator based in Seattle, Washington."
			/>
			<BentoBox>
				<BentoItem
					size='eight'
					background='tertiary'
					padding='x-large'
					gap='large'
				>
					<Headline tag="h1" size='h2' color='primary' collapse>
							Hey 🤘 My name is Jory Tindall.
					</Headline>
					<Headline tag="p" size='h4' color='primary' collapse>
						I&apos;m an empathetic interface and experience designer
						with passions for system-thinking and design systems,
						design technology, and shredding the saxophone,
						currently based in Seattle, Washington.
					</Headline>
					<Paragraph collapse>
						I&apos;m currently helping to empower a broad range of
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
					<Paragraph collapse>
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
				</BentoItem>
				<BentoItem
					size="four"
					padding='x-large'
					gap='large'
					background='dark'
				>
					<Headline tag="h2" size="h4" color='light' collapse>Upcoming events</Headline>
				</BentoItem>
				<BentoItem
					size='four'
					padding='x-large'
					gap='small'
					background='tertiary'
				>
					<Headline tag='h3' size='h4' color='primary' collapse>Portfolio</Headline>
					<Paragraph type='secondary' collapse>Recent work in design, engineering, and other creative projects.</Paragraph>
					<TextArrow href='/portfolio'>My portfolio</TextArrow>
				</BentoItem>
				<BentoItem
					size='four'
					padding='x-large'
					gap='small'
					background='tertiary'
				>
					<Headline tag='h3' size='h4' color='primary' collapse>Music</Headline>
					<Paragraph type='secondary' collapse>Music projects, original compositions, current working ensembles.</Paragraph>
					<TextArrow href='/music'>My music</TextArrow>
				</BentoItem>
				<BentoItem
					size='four'
					padding='x-large'
					gap='small'
					background='secondary'
				>
					<Headline tag='h3' size='h4' color='dark' collapse>Get in touch</Headline>
					<Paragraph type='secondary' collapse>Reach out to say hello 👋!</Paragraph>
					<TextArrow href='/contact'>Contact me</TextArrow>
				</BentoItem>
			</BentoBox>
			{/* <section className={styles.mainContent}>
				<article>
					<Headline tag="h1" size='h2'>
						Hey 🤘 My name is Jory Tindall.
					</Headline>
					<Headline tag="p" size='h4'>
						I&apos;m an empathetic interface and experience designer
						with passions for system-thinking and design systems,
						design technology, and shredding the saxophone,
						currently based in Seattle, Washington.
					</Headline>
					<Paragraph>
						I&apos;m currently helping to empower a broad range of
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
					<TextArrow href='music'>My music</TextArrow>
				</article>
				<article>
					<Headline tag="h3">Want to know more?</Headline>
					<Paragraph>
						<InlineLink type="internal" href="contact">
							Drop me a line,
						</InlineLink>{' '}
						I&apos;m always looking to meet new people and start up
						new collaborations.
					</Paragraph>
				</article>
			</section> */}
		</Layout>
	);
}

export async function getStaticProps() {
	return {
		props: {},
	};
}
