import { useNextSanityImage } from "next-sanity-image"
import { usePreviewSubscriptionHook } from "lib/sanity"
import { getClient, previewClient } from "lib/sanity.server"
import { GET_ALL_EVENTS } from "lib/queries"
import { PageTitle } from "components/page-title"
import { EventItem } from "components/event"
import styles from 'styles/pages/Events.module.scss'

export default function EventsPage({ data, preview }) {

    const { events } = data

    console.log(events)

    const getEvents = events.map(event => {
        return (
            <EventItem
                title={event.title}
                date={event.date}
                location={event.location}
                slug={event.slug}
                key={event._id}
            />
        )
    })

    return (
        <>
            <PageTitle title='🗓 Events' megaTitle="Upcoming Events" />
            <section className={styles.wrapper}>
                {getEvents}
            </section>
        </>
    )
}

export async function getStaticProps({ preview = false }) {
    const events = await getClient(preview).fetch(GET_ALL_EVENTS)

    return {
        props: {
            preview,
            data: { events }
        }
    }
}