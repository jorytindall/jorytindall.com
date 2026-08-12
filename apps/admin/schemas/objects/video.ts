import { BiVideo } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: 'video',
	title: 'Video',
	type: 'object',
	icon: BiVideo,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'source',
			title: 'Source',
			type: 'string',
			options: {
				list: [
					{ title: 'Mux Video', value: 'mux' },
					{ title: 'YouTube Video', value: 'youTube' },
				],
			},
		},
		{
			name: 'youTubeId',
			title: 'YouTube Video ID',
			type: 'string',
			description: 'ID of the YouTube video',
			hidden: ({ parent }: any) => parent?.source !== 'youTube',
		},
		// {
		//   name: 'muxVideo',
		//   title: 'Mux Video file',
		//   type: 'mux.video',
		//   hidden: ({ parent }: any) => parent?.source !== 'muxVideo',
		// }
	],
});
