import { format, parseISO } from 'date-fns'
import { getClient } from 'lib/sanity.server'
import { GET_ALL_TALKS } from 'lib/queries'
import { PageTitle } from 'components/page-title'
import { CenteredWrapper, Layout } from 'components/layout'
import { MetaHead } from 'components/meta'
import { linkResolver } from 'utils/linkResolver'
import { ListItem } from 'components/list/list-item'
import { Paragraph } from 'components/typography'

export default function TalksPage({ data }) {
  const { talks } = data;

  const renderTalks = talks.map(talk => {
    return (
      <ListItem
        key={talk._id}
        title={talk.title}
        link={linkResolver('talk', talk.slug)}
      >
        <Paragraph type='primary' collapse>{talk.description}</Paragraph>
        <Paragraph
          type='secondary'
          collapse
        >Given at <strong>{talk.conference}</strong> on <strong>{format(parseISO(talk.date), 'MMMM do, yyyy')}</strong></Paragraph>
      </ListItem>
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
      <CenteredWrapper semanticElement="section">
        {renderTalks}
      </CenteredWrapper>
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