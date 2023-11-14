import Link from 'next/link'
import { getClient } from 'lib/sanity.server'
import { Layout } from 'components/layout'
import { MetaHead } from 'components/meta'
import { PageTitle } from 'components/page-title'
import { linkResolver } from 'utils/linkResolver'
import { GET_ALL_PRESS_KITS } from 'lib/queries'

export default function PressKitPage({ data }) {

  const pressKits = data.pressKits.map((p) => {
    return (
      <Link href={linkResolver('pressKit', p.slug)} key={p._id}>{p.title}</Link>
    )
  })

  return (
    <Layout>
      <MetaHead
        title='Press kits'
        description='Press kits for Jory Tindall&apos;s projects'
        slug='press-kits'
      />
      <PageTitle title="📣 Press kits" megaTitle="Get the deets" />
      {pressKits}
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const pressKits = await getClient(preview).fetch(GET_ALL_PRESS_KITS);

  return {
    props: {
      preview,
      data: { pressKits }
    },
    revalidate: 60,
  }
}