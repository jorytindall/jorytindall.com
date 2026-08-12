import { BiDownload } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
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
});
