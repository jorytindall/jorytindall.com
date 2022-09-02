import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { usePreviewSubscriptionHook } from 'lib/sanity'
import { getClient, previewClient } from 'lib/sanity.server'
import { GET_BLOG_POSTS, GET_BLOG_POST_PATHS } from 'lib/queries'
import { Headline } from 'components/typography'

export default function BlogPage({ data, preview }) {
    const router = useRouter()

    return (
        <>
            <Headline type='h3'>Recent posts</Headline>
        </>
    )
}