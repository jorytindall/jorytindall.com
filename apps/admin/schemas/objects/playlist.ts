import { RiPlayListFill } from 'react-icons/ri';
import { defineType } from 'sanity';

export default defineType({
	name: 'playlist',
	title: 'Playlist',
	type: 'object',
	icon: RiPlayListFill,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().error('The playlist must have a title.'),
		},
		{
			name: 'tracks',
			title: 'Tracks',
			type: 'array',
			of: [
				{
					type: 'audio',
					title: 'Audio',
				},
			],
		},
		{
			name: 'artwork',
			title: 'Artwork',
			type: 'mainImage',
		},
	],
});
