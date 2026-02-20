import { format, parseISO } from 'date-fns';
import { isoDateToString } from '../../utils/formatDate';
import { slugify } from '../../utils/slugify';

export default {
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
			name: 'date',
			title: 'Date',
			type: 'datetime',
			options: {
				allowTimeZoneSwitch: true,
				displayTimeZone: 'America/Los_Angeles',
			}
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			validation: (Rule: any) => [
				Rule.required().error("The event must have a slug."),
			],
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
			location: 'location',
		},
		prepare(selection: { title?: string; date?: string; location?: string }) {
			const { title, date, location } = selection;
			const formattedDate = date ? format(parseISO(date), 'MMMM d, yyyy') : 'No date';
			const subtitleParts = [formattedDate];
			if (location) {
				subtitleParts.push(location);
			}
			return {
				title: title || 'Untitled Event',
				subtitle: subtitleParts.join(' — '),
			};
		},
	},
};
