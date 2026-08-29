import { notFound } from 'next/navigation';
import { formatEventDateTime, formatEventSchedule } from 'utils/datetimeFormat';
import { sanityClient } from 'lib/sanity/config';
import { sanityFetch } from 'lib/sanity/fetch';
import { GET_EVENTS, GET_EVENT_PATHS } from 'lib/queries';
import { Headline, Paragraph, InlineLink } from 'components/typography';
import { RichText } from 'components/rich-text';
import { GridWrapper } from 'components/layout';
import { Button } from 'components/button';
import styles from './Event.module.css';

// Revalidate events every minute
export const revalidate = 60;

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const events = await sanityFetch(GET_EVENTS, { slug }, { stega: false });

	if (!events) {
		return { title: '404: Not found' };
	}

	return {
		title: events.title,
	};
}

export async function generateStaticParams() {
	const client = sanityClient;
	const slugs = await client.fetch(GET_EVENT_PATHS);
	return slugs.map((slug) => ({ slug }));
}

export default async function Event({ params }) {
	const { slug } = await params;
	const events = await sanityFetch(GET_EVENTS, { slug });

	// An unresolvable slug would otherwise throw on destructuring below.
	if (!events) {
		notFound();
	}

	const { title, eventFormat, performances, description, location, url } = events;

	return (
		<GridWrapper>
			<section className={styles.wrapper}>
				<Headline tag="h1" color="primary" collapse>
					{title}
				</Headline>
				<Paragraph color="secondary" collapse>
					{formatEventSchedule(events)}
					{location && (
						<>
							{' '}
							at{' '}
							{url ? (
								<InlineLink href={url} type="external">
									{location}
								</InlineLink>
							) : (
								location
							)}
						</>
					)}
				</Paragraph>
				{eventFormat === 'series' && performances?.length > 0 && (
					<ul className={styles.performances}>
						{performances.map((performance) => (
							<li key={performance._key} className={styles.performance}>
								<strong>{formatEventDateTime(performance.date)}</strong>
								{performance.note ? ` — ${performance.note}` : ''}
							</li>
						))}
					</ul>
				)}
				{description && <RichText value={description.content} />}
				{url && <Button href={url}>More information</Button>}
			</section>
		</GridWrapper>
	);
}
