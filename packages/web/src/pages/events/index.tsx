import { usePreviewSubscriptionHook } from "lib/sanity"
import { getClient, previewClient } from "lib/sanity.server"
import { GET_EVENTS } from "lib/queries"
import { PageTitle } from "components/page-title"

export default function EventsPage({ data, preview }) {

    console.log(data)

    return (
        <p>Events page.</p>
    )
}

export async function getStaticProps({ params, preview = false }) {
    const events = await getClient(preview).fetch(GET_EVENTS)

    return {
        props: {
            preview,
            data: { events }
        }
    }
}