import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { getClient, previewClient } from 'lib/sanity.server'
import {
  GET_PRESS_KITS,
  GET_PRESS_KIT_PATHS
} from 'lib/queries'
import { ModuleRenderer } from 'components/module-renderer'
import { MetaHead } from 'components/meta'
import { Layout } from 'components/layout'
import { linkResolver } from 'utils/linkResolver'

export default function PressKit({ data, preview }) {
  const router = useRouter();

  if (!router.isFallback && !data.pressKit?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { title, slug, project, featuredImage, moduleContent } = data.pressKit

  return (
    <Layout>
      <MetaHead
        title={title}
        slug={linkResolver('pressKit', slug)}
      />
      <h1>{title}</h1>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const pressKit = await getClient(preview).fetch(
    GET_PRESS_KITS,
    {
      slug: params.slug,
    }
  )

  return {
    props: {
      preview,
      data: { pressKit },
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(previewClient).fetch(
    GET_PRESS_KIT_PATHS,
  )

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}