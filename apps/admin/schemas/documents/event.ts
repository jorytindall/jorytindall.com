import { isoDateToString } from '../../utils/formatDate';
import { slugify } from '../../utils/slugify';

export default {
	name: 'event',
	title: 'Event',
	type: 'document',
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
};
