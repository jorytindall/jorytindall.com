import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { sanityClient } from 'utils/sanity/sanityClient'
import { getSanityImageUrl } from 'utils/getSanityImage'
import { linkResolver } from 'utils/linkResolver'
import { GET_TALKS, GET_TALK_PATHS } from 'lib/queries'
import { Headline, Paragraph } from 'app/components/typography'
import { ModuleRenderer } from 'app/components/module-renderer'
import { GridWrapper } from 'app/components/layout'
import { Button } from 'app/components/button'
import styles from 'styles/pages/Talk.module.scss';

export async function generateMetadata({ params }) {
    const { slug } = params;
    const client = sanityClient
    const talk = await client.fetch(GET_TALKS, {
        slug
    })

    return {
        title: `${talk.title} | Jory Tindall`,
    }
}

export async function generateStaticParams() {
    const client = sanityClient
    const slugs = await client.fetch(
        GET_TALK_PATHS,
        {
            next: {
                revalidate: 60,
            },
        }
    )
    return slugs.map((slug) => ({ slug }));
}

export default async function Talk({ params }) {
    const { slug } = params
    const talk = await sanityClient.fetch(GET_TALKS, { slug })

    const {
        title,
        conference,
        conferenceLink,
        date,
        link,
        deck,
        moduleContent,
        image
    } = talk;

    return (
        <GridWrapper>
            <div className={styles.wrapper}>
                {image &&
                    <div className={styles.imageWrapper}>
                        <Image
                            fill
                            // @ts-ignore
                            src={getSanityImageUrl(image)}
                            alt={image.altText}
                        />
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
    )
}