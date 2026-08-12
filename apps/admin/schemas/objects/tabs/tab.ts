import { BiFile } from 'react-icons/bi';
import { defineType } from 'sanity';

export default defineType({
	name: 'tab',
	title: 'Tab',
	type: 'object',
	icon: BiFile,
	fields: [
		{
			name: 'label',
			title: 'Label',
			type: 'string',
		},
		{
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [{ type: 'richText' }],
		},
	],
});
