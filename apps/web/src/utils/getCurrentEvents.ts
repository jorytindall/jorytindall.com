import { format, parseISO } from 'date-fns';

export const getCurrentEvents = (events) => {

	const currentEvents = events.filter((event) => {
		const today = format(new Date(), 'yyyyMMdd');
		return format(parseISO(event.startDate), 'yyyyMMdd' + 1) > today;
	});

	return currentEvents;
};
