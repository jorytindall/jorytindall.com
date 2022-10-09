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
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
			},
		},
		{
			name: 'project',
			title: 'Project',
			type: 'reference',
			to: [{ type: 'musicProject' }],
		},
		{
			name: 'date',
			title: 'Date',
			type: 'datetime',
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
