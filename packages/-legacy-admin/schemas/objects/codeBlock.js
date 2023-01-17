import { BiCodeBlock } from 'react-icons/bi';

export default {
	name: `codeBlock`,
	title: `Code Block`,
	type: `object`,
	icon: BiCodeBlock,
	fields: [
		{
			name: `description`,
			title: `Description`,
			type: `string`,
			description: `Describe the code block in a couple of words.`,
			validation: (Rule) =>
				Rule.required().warning(
					`It's recommended that you add a title to the code block to differentiate between them in the editor.`
				),
		},
		{
			name: `language`,
			title: `Language`,
			type: `string`,
			description: `The language of the code block, will be displayed upon render.`,
			options: {
				list: [
					{ title: `JavaScript`, value: `js` },
					{ title: `HTML`, value: `html` },
					{ title: `CSS`, value: `css` },
				],
			},
		},
		{
			name: `code`,
			title: `Code`,
			type: `code`,
			options: {
				language: `js`,
				languageAlternatives: [`html`, `css`],
				theme: `monokai`,
				withFileName: true,
			},
		},
	],
	preview: {
		select: {
			title: `language`,
			subtitle: `description`,
		},
	},
};
