import Link from 'next/link'
import { linkResolver } from 'utils/linkResolver'
import { formatDate } from 'utils/datetimeFormat'
import { getCurrentEvents } from 'utils/getCurrentEvents'
import { Paragraph } from 'app/components/typography'
import styles from 'styles/components/EventList.module.scss'

export const EventList = ({ events }) => {

  const currentEvents = getCurrentEvents(events);

  return (
    <div className={styles.wrapper}>
      {currentEvents.length > 0 ?      
        currentEvents.map(event => {
          return (
            <div className={styles.event} key={event._id}>
              <Link href={linkResolver('event', event.slug)} className={styles.content}>
                <p className={styles.title}><strong>{event.title}</strong></p>
                <p className={styles.date}>{formatDate(event.date)}</p>
              </Link>
            </div>
          )
        }) :
        <p className={styles.noEvents}>No upcoming events, check back soon!</p>
      }
    </div>
  )
}