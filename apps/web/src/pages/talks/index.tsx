import { getClient } from 'lib/sanity.server'
import { GET_ALL_TALKS } from 'lib/queries'
import { PageTitle } from 'components/page-title'
import { Layout } from 'components/layout'
import { MetaHead } from 'components/meta'

export default function TalksPage({ data }) {
  const { talks } = data;

  console.log(talks)

  return (
    <Layout>
      <MetaHead
        title='Talks'
        description='Speaking engagements and conference talks'
        slug='talks'
      />
      <PageTitle title='🎙️ Talks' megaTitle="Speaking Engagements" />
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