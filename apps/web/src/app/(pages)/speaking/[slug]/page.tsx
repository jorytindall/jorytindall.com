import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatLongDate } from 'utils/datetimeFormat';
import { sanityClient } from 'lib/sanity/config';
import { sanityFetch } from 'lib/sanity/fetch';
import { getSanityImageUrl } from 'utils/getSanityImage';
import { GET_TALKS, GET_TALK_PATHS } from 'lib/queries';
import { Headline, Paragraph } from 'components/typography';
import { ModuleRenderer } from 'components/module-renderer';
import { GridWrapper } from 'components/layout';
import { Button } from 'components/button';
import styles from './Talk.module.css';

// Revalidate events every minute
export const revalidate = 60;

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const talk = await sanityFetch(GET_TALKS, { slug }, { stega: false });

	if (!talk) {
		return { title: '404: Not found' };
	}

	return {
		title: talk.title,
	};
}

export async function generateStaticParams() {
	const client = sanityClient;
	const slugs = await client.fetch(GET_TALK_PATHS);
	return slugs.map((slug) => ({ slug }));
}

export default async function Talk({ params }) {
	const { slug } = await params;
	const talk = await sanityFetch(GET_TALKS, { slug });

	// An unresolvable slug would otherwise throw on destructuring below.
	if (!talk) {
		notFound();
	}

	const { title, conference, conferenceLink, date, link, deck, moduleContent, image } = talk;

	return (
		<GridWrapper>
			<div className={styles.wrapper}>
				{image && (
					<div className={styles.imageWrapper}>
						<Image
							fill
							// @ts-ignore
							src={getSanityImageUrl(image)}
							alt={image.alternativeText}
						/>
					</div>
				)}
				<div className={styles.metadata}>
					{title && (
						<Headline tag="h1" size="h1" color="primary" collapse>
							{title}
						</Headline>
					)}
					<Paragraph type="secondary" collapse>
						Given at{' '}
						<a href={conferenceLink} target="blank">
							{conference}
						</a>{' '}
						on {formatLongDate(date)}
					</Paragraph>
					<div className={styles.actions}>
						{link && (
							<Button variant="primary" href={link}>
								See the talk
							</Button>
						)}
						{deck && (
							<Button variant="secondary" href={deck}>
								Spec the deck
							</Button>
						)}
					</div>
				</div>
				{moduleContent && <ModuleRenderer modules={moduleContent} />}
			</div>
		</GridWrapper>
	);
}
