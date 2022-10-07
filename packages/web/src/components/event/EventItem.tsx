import Link from 'next/link'
import { Headline, Paragraph } from 'components/typography'
import { Container } from 'components/layout'
import { linkResolver } from 'utils/linkResolver'
import { formatDateTime } from 'utils/datetimeFormat'
import styles from 'styles/components/event/EventItem.module.scss'

interface EventItemProps {
    title: string,
    date: string,
    location?: string,
    slug: string,
    description?: string,
}

export const EventItem = ({
    title,
    date,
    location,
    slug,
}: EventItemProps) => {

    return (
        <Link href={linkResolver('event', slug)}>
            <a className={styles.wrapper}>
                <Container
                    density='default'
                    flexDirection='column'
                    semanticElement='div'
                    isFlex
                >
                    <Headline type='h4' collapse>{title}</Headline>
                    <Paragraph collapse>{formatDateTime(date)}</Paragraph>
                    <Paragraph collapse>{location}</Paragraph>
                </Container>
            </a>
        </Link>
    )
}

