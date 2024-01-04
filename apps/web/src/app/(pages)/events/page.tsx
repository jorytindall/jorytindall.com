import { sanityClient } from 'lib/sanity/sanityClient';
import { format, parseISO } from 'date-fns';
import { GET_ALL_EVENTS } from 'lib/queries';
import { getCurrentEvents } from 'utils/getCurrentEvents';
import { PageTitle } from 'app/components/page-title';
import { CenteredWrapper } from 'app/components/layout';
import { ListItem } from 'app/components/list';
import { linkResolver } from 'utils/linkResolver';
import { Paragraph } from 'app/components/typography';

import type { Metadata } from 'next';

// Revalidate events every minute
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Events | Jory Tindall',
	description: 'Upcoming events and live music',
};

export default async function Events() {
	const client = sanityClient;
	const events = await client.fetch(GET_ALL_EVENTS);

	const currentEvents = getCurrentEvents(events);

	const filterEvents =
		currentEvents.length > 0 ? (
			currentEvents.map((event) => {

				const { title, location, date, slug, _id } = event;

				const eventLink = linkResolver('event', slug);
				const eventDate = format(parseISO(date), 'MMMM do, yyyy');

				return (
					<ListItem
						title={title}
						link={eventLink}
						key={_id}
					>
						<Paragraph type="primary" color='secondary' collapse>
							<strong>Location: </strong>
							{location}
						</Paragraph>
						<Paragraph type="primary" color='secondary' collapse>
							<strong>Date: </strong>
							{eventDate}
						</Paragraph>
					</ListItem>
				);
			})
		) : (
			<Paragraph color='secondary' collapse>No upcoming events, check back soon!</Paragraph>
		);

	return (
		<>
			<PageTitle title="🗓 Events" megaTitle="Upcoming Events" />
			<CenteredWrapper semanticElement="section">
				{filterEvents}
			</CenteredWrapper>
		</>
	);
}
