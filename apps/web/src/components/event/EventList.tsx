import Link from 'next/link';
import { linkResolver } from 'utils/linkResolver';
import { formatDate, formatEventDate, formatEventDateTime } from 'utils/datetimeFormat';
import styles from './EventList.module.css';

export const EventList = ({ events }) => {


	return (
		<div className={styles.wrapper}>
			{events.length > 0 ? (
				events.map((event) => {
					// Debug logging to verify timezone conversion
					console.log(`Event: ${event.title}`);
					console.log(`UTC Date: ${event.date}`);
					console.log(`Pacific Date: ${formatEventDate(event.date)}`);
					console.log(`With Time: ${formatEventDateTime(event.date)}`);
					console.log('---');

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
									{formatEventDateTime(event.date, event.timezone)}
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