import { format, parseISO } from 'date-fns';
import { getClient } from 'lib/sanity.server';
import { GET_ALL_EVENTS } from 'lib/queries';
import { getCurrentEvents } from 'utils/getCurrentEvents';
import { PageTitle } from 'components/page-title';
import { EventItem } from 'components/event';
import { Paragraph } from 'components/typography';
import { MetaHead } from 'components/meta';
import { Layout } from 'components/layout'
import styles from 'styles/pages/Events.module.scss';

export default function EventsPage({ data }) {
	const { events } = data;

	const currentEvents = getCurrentEvents(events);

	const filterEvents =
		currentEvents.length > 0 ? (
			currentEvents.map((event) => {
				return (
					<EventItem
						title={event.title}
						date={event.date}
						location={event.location}
						slug={event.slug}
						key={event._id}
					/>
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
			<section className={styles.wrapper}>{filterEvents}</section>
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