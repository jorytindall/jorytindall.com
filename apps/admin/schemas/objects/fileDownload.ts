import { BiDownload } from 'react-icons/bi';

export default {
	name: 'fileDownload',
	title: 'File Download',
	type: 'object',
	icon: BiDownload,
	fields: [
		{
			name: 'text',
			title: 'Text',
			type: 'string',
		},
		{
			name: 'file',
			title: 'File',
			type: 'file',
		},
	],
};
