import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { getClient, previewClient } from 'lib/sanity.server'
import { GET_TALKS, GET_TALK_PATHS } from 'lib/queries'
import { Headline } from 'components/typography'
import { ModuleRenderer } from 'components/module-renderer'
import { Layout } from 'components/layout'
import { MetaHead } from 'components/meta'
import { linkResolver } from 'utils/linkResolver'

export default function Talk({ data, preview }) {
  const router = useRouter();

  if (!router.isFallback && !data.talk?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { 
    title,
    slug,
    description,
    conference,
    date,
    link,
    deck,
    moduleContent 
  } = data.talk;

  return (
    <Layout>
      <MetaHead
        title={title}
        description={description}
        slug={linkResolver('talk', slug)}
      />
      <Headline tag='h1' collapse>{title}</Headline>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false}) {
  const talk = await getClient(preview).fetch(GET_TALKS, {
    slug: params.slug,
  });

  return {
    props:  {
      preview,
      data: { talk },
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const paths = await getClient(previewClient).fetch(GET_TALK_PATHS);

  return {
    paths: paths.map((slug) => ({ params: { slug }})),
    fallback: false,
  }
}