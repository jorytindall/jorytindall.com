import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns';
import Image from 'next/image'
import { getClient, previewClient } from 'lib/sanity.server'
import { getSanityImageUrl } from 'utils/getSanityImage'
import { linkResolver } from 'utils/linkResolver'
import { GET_TALKS, GET_TALK_PATHS } from 'lib/queries'
import { Headline, Paragraph } from 'components/typography'
import { ModuleRenderer } from 'components/module-renderer'
import { GridWrapper, Layout } from 'components/layout'
import { MetaHead } from 'components/meta'
import { Button } from 'components/button'
import styles from 'styles/pages/Talk.module.scss'

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
    conferenceLink,
    date,
    link,
    deck,
    moduleContent,
    image
  } = data.talk;

  return (
    <Layout>
      <MetaHead
        title={title}
        description={description}
        slug={linkResolver('talk', slug)}
      />
      <GridWrapper>
        <div className={styles.wrapper}>
          {image &&
            <div className={styles.imageWrapper}>
              <Image src={getSanityImageUrl(image)} fill alt={image.altText} />
            </div>
          }
          <div className={styles.metadata}>
            {title && <Headline tag="h1" size="h1" color='primary' collapse>{title}</Headline>}
            <Paragraph type="secondary" collapse>Given at <a href={conferenceLink} target="blank">{conference}</a> on {format(parseISO(date), 'MMMM do, yyyy')}</Paragraph>
            <div className={styles.actions}>
              {link && <Button variant='primary' href={link}>See the talk</Button>}
              {deck && <Button variant='secondary' href={deck}>Spec the deck</Button>}
            </div>
          </div>
          {moduleContent && <ModuleRenderer modules={moduleContent} />}
        </div>
      </GridWrapper>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const talk = await getClient(preview).fetch(GET_TALKS, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: { talk },
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = await getClient(previewClient).fetch(GET_TALK_PATHS);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}