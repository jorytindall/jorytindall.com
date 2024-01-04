import { format, parseISO } from 'date-fns';
import { sanityClient } from 'lib/sanity/sanityClient';
import { GET_EVENTS, GET_EVENT_PATHS } from 'lib/queries';
import { Headline, Paragraph, InlineLink } from 'app/components/typography';
import { RichText } from 'app/components/rich-text';
import { GridWrapper } from 'app/components/layout';
import { Button } from 'app/components/button';
import styles from 'styles/pages/Event.module.scss';

// Revalidate events every minute
export const revalidate = 60;

export async function generateMetadata({ params }) {
	const { slug } = params;
	const client = sanityClient;
	const events = await client.fetch(GET_EVENTS, { slug });

	return {
		title: `${events.title} | Jory Tindall`,
	};
}

export async function generateStaticParams() {
	const client = sanityClient;
	const slugs = await client.fetch(GET_EVENT_PATHS);
	return slugs.map((slug) => ({ slug }));
}

export default async function Event({ params }) {
	const { slug } = params;
	const events = await sanityClient.fetch(GET_EVENTS, { slug });

	const { title, date, description, location, url } = events;

	return (
		<GridWrapper>
			<section className={styles.wrapper}>
				<Headline tag="h1" color="primary" collapse>
					{title}
				</Headline>
				<Paragraph color='secondary' collapse>
					{format(parseISO(date), 'MMMM do, yyyy')} at{' '}
					<InlineLink href={url} type="external">
						{location}
					</InlineLink>
				</Paragraph>
				{description && <RichText value={description.content} />}
				<Button href={url}>More information</Button>
			</section>
		</GridWrapper>
	);
}
