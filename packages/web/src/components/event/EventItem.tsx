import Link from 'next/link'
import styles from 'styles/components/EventItem.module.scss'
import { Headline, Paragraph } from 'components/typography'
import { linkResolver } from 'utils/linkResolver'
import { formatDateTime } from 'utils/datetimeFormat'

interface EventItemProps {
    title: string,
    date: string,
    location?: string,
    slug: string
}

export const EventItem = ({
    title,
    date,
    location,
    slug,
}: EventItemProps) => {
    return (
        <Link href={linkResolver('event', slug)} className={styles.eventItem}>
            <a>
                {title && <Headline type='h4'>{title}</Headline>}
                {date && <Paragraph collapse>{formatDateTime(date)}</Paragraph>}
                {location && <Paragraph collapse>{location}</Paragraph>}
            </a>
        </Link>
    )
}

