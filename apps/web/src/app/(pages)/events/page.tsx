import { sanityClient } from 'lib/sanity/sanityClient';
import { format, parseISO } from 'date-fns';
import { GET_ALL_EVENTS } from 'lib/queries';
import { getCurrentEvents } from 'utils/getCurrentEvents';
import { PageTitle } from 'app/components/page-title';
import { Paragraph } from 'app/components/typography';
import { CenteredWrapper } from 'app/components/layout';
import { ListItem } from 'app/components/list';
import { linkResolver } from 'utils/linkResolver';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Events | Jory Tindall',
	description: 'Upcoming events and live music',
};

export default async function Events() {
	const client = sanityClient;
	const events = await client.fetch(GET_ALL_EVENTS, {
		next: {
			revalidate: 60,
		},
	});

	const currentEvents = getCurrentEvents(events);

	const filterEvents =
		currentEvents.length > 0 ? (
			currentEvents.map((event) => {
				return (
					<ListItem
						title={event.title}
						link={linkResolver('event', event.slug)}
						key={event._id}
					>
						<Paragraph type="primary" collapse>
							<strong>Location: </strong>
							{event.location}
						</Paragraph>
						<Paragraph type="primary" collapse>
							<strong>Date: </strong>
							{format(parseISO(event.date), 'MMMM do, yyyy')}
						</Paragraph>
					</ListItem>
				);
			})
		) : (
			<Paragraph>No upcoming events, check back soon!</Paragraph>
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
