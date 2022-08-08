import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { usePreviewSubscriptionHook } from '../lib/sanity'
import { getClient } from '../lib/sanity.server'
import { GET_PAGES, GET_PAGE_PATHS } from 'lib/queries'

export default function Page({ data, preview }) {
    const router = useRouter()

    const { data: page } = usePreviewSubscriptionHook(GET_PAGES, {
        params: {slug: data.page?.slug},
        initialData: data.page,
        enabled: preview && data.page?.slug,
    })

    if (!router.isFallback && !data.page?.slug) {
        return <ErrorPage statusCode={404} />
    }

    const { title } = page

    return (
        <>
            <h1>{title}</h1>
        </>
    )
}

export async function getStaticProps({ params, preview = false }) {
    const page = await getClient(preview).fetch(GET_PAGES, {
        slug: params.slug,
    })

    return {
        props: {
            preview,
            data: {page}
        }
    }
}

export async function getStaticPaths() {
    const paths = await getClient().fetch(GET_PAGE_PATHS)

    return {
        paths: paths.map((slug) => ({ params: {slug} })),
        fallback: true,
    }
}