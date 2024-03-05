import { sanityClient } from 'lib/sanity/sanityClient';
import { GET_HOMEPAGE_DATA } from 'lib/queries';
import { Headline, Paragraph, InlineLink } from 'app/components/typography';
import { TextArrow } from 'app/components/button';
import { Container } from 'app/components/layout';
import { BentoBox, BentoItem } from 'app/components/bento';
import { EventList } from 'app/components/event';

import type { Metadata } from 'next';

// Revalidate events every minute
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Jory Tindall | Designer, saxophone artist, educator.',
	description:
		'Home of Jory Tindall; User experience designer, saxophone artist, and music educator based in Seattle, Washington.',
};

export default async function Home() {
	const homePage = await sanityClient.fetch(GET_HOMEPAGE_DATA);

	return (
		<BentoBox>
			<BentoItem
				size="x-large"
				background="tertiary"
				padding="x-large"
				gap="medium"
				isJustified
			>
				<Container
					isFlex
					density="collapse"
					gap="default"
					semanticElement="div"
				>
					<Headline tag="h1" size="h2" color="primary" collapse>
						Hey 🤘 My name is Jory Tindall.
					</Headline>
					<Headline tag="p" size="h4" color="primary" collapse>
						I&apos;m an empathetic interface and experience designer
						with passions for system-thinking and design systems,
						design technology, and shredding the saxophone,
						currently based in Seattle, Washington.
					</Headline>
					<Paragraph color='secondary' collapse>
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
					<Paragraph color='secondary' collapse>
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
				</Container>
				<TextArrow href="/about" style="primary">
					More about me
				</TextArrow>
			</BentoItem>
			<BentoItem
				size="medium"
				padding="x-large"
				gap="large"
				background="dark"
				isJustified
			>
				<Container
					isFlex
					flexDirection="column"
					semanticElement="div"
					density="collapse"
					gap="default"
				>
					<Headline tag="h2" size="h4" color="light" collapse>
						Upcoming events
					</Headline>
					<EventList events={homePage} />
				</Container>
				<TextArrow href="/events" style="dark">
					All events
				</TextArrow>
			</BentoItem>
			<BentoItem
				size="medium"
				padding="x-large"
				gap="small"
				background="tertiary"
				isJustified
			>
				<Container
					isFlex
					flexDirection="column"
					semanticElement="div"
					density="collapse"
				>
					<Headline tag="h3" size="h4" color="primary" collapse>
						Portfolio
					</Headline>
					<Paragraph type="secondary" collapse>
						Recent work in design, engineering, and other creative
						projects.
					</Paragraph>
				</Container>
				<TextArrow href="/portfolio" style="neutral">
					My portfolio
				</TextArrow>
			</BentoItem>
			<BentoItem
				size="medium"
				padding="x-large"
				gap="small"
				background="tertiary"
				isJustified
			>
				<Container
					isFlex
					flexDirection="column"
					semanticElement="div"
					density="collapse"
				>
					<Headline tag="h3" size="h4" color="primary" collapse>
						Music
					</Headline>
					<Paragraph type="secondary" collapse>
						Music projects, original compositions, current working
						ensembles.
					</Paragraph>
				</Container>
				<TextArrow href="/music" style="neutral">
					My music
				</TextArrow>
			</BentoItem>
			<BentoItem
				size="medium"
				padding="x-large"
				gap="small"
				background="secondary"
				isJustified
			>
				<Container
					isFlex
					flexDirection="column"
					semanticElement="div"
					density="collapse"
				>
					<Headline tag="h3" size="h4" color="secondary" collapse>
						Get in touch
					</Headline>
					<Paragraph type="secondary" collapse>
						Reach out to say hello 👋!
					</Paragraph>
				</Container>
				<TextArrow href="/contact" style="neutral">
					Contact me
				</TextArrow>
			</BentoItem>
		</BentoBox>
	);
}
