import { BiDownload } from 'react-icons/bi';

export default {
	name: 'fileDownload',
	title: 'File Download',
	type: 'object',
	icons: BiDownload,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
		},
		{
			name: 'file',
			title: 'File',
			type: 'file',
		},
	],
};
