import { format, parseISO } from 'date-fns';
import { isoDateToString } from '../../utils/formatDate';
import { slugify } from '../../utils/slugify';
import { defineType } from 'sanity';

export default defineType({
	name: 'event',
	title: 'Event',
	type: 'document',
	orderings: [
		{
			title: 'Date, Most Recent',
			name: 'dateDesc',
			by: [{ field: 'date', direction: 'desc' }],
		},
		{
			title: 'Date, Oldest',
			name: 'dateAsc',
			by: [{ field: 'date', direction: 'asc' }],
		},
	],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'eventFormat',
			title: 'Event Format',
			type: 'string',
			description:
				'How this event is scheduled. Single is a one-off; Multi-day spans a continuous range; Series is a production or run with several discrete performances.',
			initialValue: 'single',
			options: {
				list: [
					{ title: 'Single', value: 'single' },
					{ title: 'Multi-day (continuous range)', value: 'multiDay' },
					{ title: 'Series / Production (multiple performances)', value: 'series' },
				],
				layout: 'radio',
			},
			validation: (Rule: any) => Rule.required().error('Choose how this event is scheduled.'),
		},
		{
			name: 'date',
			title: 'Start Date',
			type: 'datetime',
			description:
				'Start date and time. For a series, use the date of the first performance — this drives the slug and sort order.',
			options: {
				allowTimeZoneSwitch: true,
				displayTimeZone: 'America/Los_Angeles',
			},
			validation: (Rule: any) => Rule.required().error('The event must have a start date.'),
		},
		{
			name: 'endDate',
			title: 'End Date',
			type: 'datetime',
			description: 'When the event ends.',
			hidden: ({ document }: any) => document?.eventFormat !== 'multiDay',
			options: {
				allowTimeZoneSwitch: true,
				displayTimeZone: 'America/Los_Angeles',
			},
			validation: (Rule: any) =>
				Rule.custom((endDate: string, context: any) => {
					const { eventFormat, date } = context.document || {};
					if (eventFormat !== 'multiDay') return true;
					if (!endDate) return 'Multi-day events need an end date.';
					if (date && new Date(endDate) < new Date(date))
						return 'The end date must be after the start date.';
					return true;
				}),
		},
		{
			name: 'performances',
			title: 'Performances',
			type: 'array',
			description: 'Each performance in the run, in chronological order.',
			hidden: ({ document }: any) => document?.eventFormat !== 'series',
			of: [{ type: 'eventPerformance' }],
			validation: (Rule: any) =>
				Rule.custom((performances: any[], context: any) => {
					if (context.document?.eventFormat !== 'series') return true;
					if (!performances || performances.length === 0)
						return 'Add at least one performance for a series.';
					return true;
				}),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			validation: (Rule: any) => [Rule.required().error('The event must have a slug.')],
			options: {
				source: (doc: any) => {
					const { title, date } = doc;
					const slug = slugify([title, isoDateToString(date)]);
					return slug;
				},
			},
		},
		{
			name: 'location',
			title: 'Location',
			type: 'string',
		},
		{
			name: 'url',
			title: 'URL',
			type: 'url',
		},
		{
			name: 'project',
			title: 'Project',
			type: 'reference',
			to: [{ type: 'musicProject' }],
		},
		{
			name: 'image',
			title: 'Image',
			type: 'mainImage',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'richText',
		},
	],
	preview: {
		select: {
			title: 'title',
			date: 'date',
			endDate: 'endDate',
			location: 'location',
			eventFormat: 'eventFormat',
			performances: 'performances',
		},
		prepare(selection: {
			title?: string;
			date?: string;
			endDate?: string;
			location?: string;
			eventFormat?: string;
			performances?: { date?: string }[];
		}) {
			const { title, date, endDate, location, eventFormat, performances } = selection;
			const fmt = (d: string) => format(parseISO(d), 'MMMM d, yyyy');

			let dateLabel = 'No date';
			if (eventFormat === 'multiDay' && date && endDate) {
				dateLabel = `${fmt(date)} – ${fmt(endDate)}`;
			} else if (eventFormat === 'series') {
				const count = performances?.length || 0;
				const range = date ? fmt(date) : 'No date';
				dateLabel = `${range} · ${count} performance${count === 1 ? '' : 's'}`;
			} else if (date) {
				dateLabel = fmt(date);
			}

			const subtitleParts = [dateLabel];
			if (location) {
				subtitleParts.push(location);
			}
			return {
				title: title || 'Untitled Event',
				subtitle: subtitleParts.join(' — '),
			};
		},
	},
});
