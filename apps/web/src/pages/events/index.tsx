import { format, parseISO } from 'date-fns';
import { getClient } from 'lib/sanity.server';
import { GET_ALL_EVENTS } from 'lib/queries';
import { getCurrentEvents } from 'utils/getCurrentEvents';
import { PageTitle } from 'components/page-title';
import { Paragraph } from 'components/typography';
import { MetaHead } from 'components/meta';
import { Layout, CenteredWrapper } from 'components/layout'
import { ListItem } from 'components/list';
import { linkResolver } from 'utils/linkResolver';

export default function EventsPage({ data }) {
	const { events } = data;

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
						<Paragraph type='primary' collapse>{event.location}</Paragraph>
						<Paragraph type='primary' collapse>{format(parseISO(event.date), 'MMMM do, yyyy')}</Paragraph>
					</ListItem>
				);
			})
		) : (
			<Paragraph>No upcoming events, check back soon!</Paragraph>
		);

	return (
		<Layout>
			<MetaHead
				title="Events"
				description="Upcoming events and live music"
				slug="events"
			/>
			<PageTitle title="🗓 Events" megaTitle="Upcoming Events" />
			<CenteredWrapper semanticElement="section">{filterEvents}</CenteredWrapper>
		</Layout>
	);
}

export async function getStaticProps({ preview = false }) {
	const events = await getClient(preview).fetch(GET_ALL_EVENTS);

	return {
		props: {
			preview,
			data: { events },
		},
		revalidate: 60,
	};
}
