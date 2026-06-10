import Link from 'next/link';
import { linkResolver } from 'utils/linkResolver';
import { formatEventSchedule } from 'utils/datetimeFormat';
import styles from './EventList.module.css';

export const EventList = ({ events }) => {


	return (
		<div className={styles.wrapper}>
			{events.length > 0 ? (
				events.map((event) => {
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
									{formatEventSchedule(event)}
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