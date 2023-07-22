import Link from 'next/link'
import { getClient } from 'lib/sanity.server'
import { GET_ALL_TALKS } from 'lib/queries'
import { PageTitle } from 'components/page-title'
import { Layout } from 'components/layout'
import { MetaHead } from 'components/meta'
import { linkResolver } from 'utils/linkResolver'

export default function TalksPage({ data }) {
  const { talks } = data;

  console.log(talks)

  const renderTalks = talks.map(talk => {
    return (
      <Link href={linkResolver('talk', talk.slug)} key={talk._id}>{talk.title}</Link>
    )
  })

  return (
    <Layout>
      <MetaHead
        title='Talks'
        description='Speaking engagements and conference talks'
        slug='talks'
      />
      <PageTitle title='🎙️ Talks' megaTitle="Speaking Engagements" />
      {renderTalks}
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const talks = await getClient(preview).fetch(GET_ALL_TALKS);

  return {
    props: {
      preview,
      data: { talks }
    },
    revalidate: 60,
  }
}