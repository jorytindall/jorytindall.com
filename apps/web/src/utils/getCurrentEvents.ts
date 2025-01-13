import { format, parseISO } from 'date-fns';
import { EventFrontmatter } from 'types/event';

export const getCurrentEvents = (events: EventFrontmatter[]): EventFrontmatter[] => {

	const currentEvents = events
		.filter((event) => {
			const today = format(new Date(), 'yyyyMMdd');
			return format(parseISO(event.startDate), 'yyyyMMdd' + 1) > today;
		})
		.sort((a, b) => {
			return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
	});

	return currentEvents;
};
