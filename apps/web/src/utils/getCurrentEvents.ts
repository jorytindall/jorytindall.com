import { parseISO, isAfter, startOfDay } from 'date-fns';
import type { Event } from 'types/event';

/**
 * Resolve the moment an event finishes, so events that have started but not
 * yet ended (multi-day ranges, in-progress series) still count as current.
 */
const getEventEnd = (event: Event) => {
	if (event.eventFormat === 'multiDay' && event.endDate) {
		return parseISO(event.endDate);
	}
	if (event.eventFormat === 'series' && event.performances?.length) {
		return event.performances
			.map((performance) => parseISO(performance.date))
			.sort((a, b) => b.getTime() - a.getTime())[0];
	}
	return parseISO(event.date);
};

export const getCurrentEvents = (events: Event[]) => {
	const today = startOfDay(new Date());
	const currentEvents = events.filter((event) => {
		const eventEnd = getEventEnd(event);
		return isAfter(eventEnd, today) || eventEnd.getTime() === today.getTime();
	});

	return currentEvents;
};
