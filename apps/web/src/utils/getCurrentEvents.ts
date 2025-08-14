import { parseISO, isAfter, startOfDay } from 'date-fns';

export const getCurrentEvents = (events) => {
	const today = startOfDay(new Date());
	const currentEvents = events.filter((event) => {
		const eventDate = parseISO(event.date);
		return isAfter(eventDate, today) || eventDate.getTime() === today.getTime();
	});

	return currentEvents;
};