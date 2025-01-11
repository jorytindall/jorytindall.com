import Link from 'next/link';
import { linkResolver } from 'utils/linkResolver';
import { formatDate } from 'utils/datetimeFormat';
import styles from './EventList.module.css';

export const EventList = ({ events }) => {

	return (
		<div className={styles.wrapper}>
			{events.length > 0 ? (
				events.map((event) => {
					return (
						<div className={styles.event} key={event.slug}>
							<Link
								href={linkResolver('event', event.slug)}
								className={styles.content}
							>
								<div className={styles.main}>
									<p className={styles.title}>
										<strong>{event.title}</strong>
									</p>
									<p className={styles.date}>
										{formatDate(event.startDate, 'America/Los_Angeles')}
									</p>
								</div>
								<div className={styles.secondary}>
									<p className={styles.location}>{event.location}</p>
								</div>
							</Link>
						</div>
					);
				})
			) : (
				<p className={styles['no-events']}>
					No upcoming events, check back soon!
				</p>
			)}
		</div>
	);
};
