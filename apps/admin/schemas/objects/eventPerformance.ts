import { format, parseISO } from 'date-fns';
import { BiCalendar } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: 'eventPerformance',
	title: 'Performance',
	type: 'object',
	icon: BiCalendar,
	fields: [
		{
			name: 'date',
			title: 'Date & Time',
			type: 'datetime',
			options: {
				allowTimeZoneSwitch: true,
				displayTimeZone: 'America/Los_Angeles',
			},
			validation: (Rule: any) =>
				Rule.required().error('A performance must have a date.'),
		},
		{
			name: 'note',
			title: 'Note',
			type: 'string',
			description:
				'Optional label for this performance (e.g. "Opening night", "Matinee").',
		},
	],
	preview: {
		select: {
			date: 'date',
			note: 'note',
		},
		prepare(selection: { date?: string; note?: string }) {
			const { date, note } = selection;
			const formattedDate = date
				? format(parseISO(date), "MMMM d, yyyy 'at' h:mm a")
				: 'No date';
			return {
				title: formattedDate,
				subtitle: note,
			};
		},
	},
});
