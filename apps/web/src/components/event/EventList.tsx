import Link from 'next/link';
import { linkResolver } from 'utils/linkResolver';
import { formatDate, formatIso, formatDateTime } from 'utils/datetimeFormat';
import styles from './EventList.module.css';

export const EventList = ({ events }) => {


	return (
		<div className={styles.wrapper}>
			{events.length > 0 ? (
				events.map((event) => {
					// console.log('Format Date: ', formatDate(event.date))
					// console.log('Format Date Time: ', formatDateTime(event.date))
					console.log('Format Date ISO: ', formatIso(event.date))
					console.log('Date: ' + event.date)
					return (
						<div className={styles.event} key={event._id}>
							<Link
								href={linkResolver('event', event.slug)}
								className={styles.content}
							>
								<p className={styles.title}>
									<strong>{event.title}</strong>
								</p>
								<p className={styles.date}>
									{formatDate(event.date)}
								</p>
							</Link>
						</div>
					);
				})
			) : (
				<p className={styles.noEvents}>
					No upcoming events, check back soon!
				</p>
			)}
		</div>
	);
};