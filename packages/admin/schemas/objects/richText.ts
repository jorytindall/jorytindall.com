import { BiText } from 'react-icons/bi';

export default {
	name: `richText`,
	title: `Rich Text`,
	type: `object`,
	icon: BiText,
	fields: [
		{
			name: `content`,
			type: `array`,
			title: `Content`,
			of: [
				{
					type: `block`,
					title: `Block`,
					styles: [
						{ title: `Normal`, value: `normal` },
						{ title: `H2`, value: `h2` },
						{ title: `H3`, value: `h3` },
						{ title: `H4`, value: `h4` },
						{ title: `H5`, value: `h5` },
						{ title: `H6`, value: `h6` },
						{ title: `Quote`, value: `blockquote` },
					],
					lists: [
						{ title: `Bullet`, value: `bullet` },
						{ title: `Number`, value: `number` },
					],
					marks: {
						decorators: [
							{ title: `Strong`, value: `strong` },
							{ title: `Emphasis`, value: `em` },
							{ title: `Code`, value: `code` },
						],
						annotations: [
							{
								name: `link`,
								type: `object`,
								title: `URL`,
								fields: [
									{
										title: `URL`,
										name: `href`,
										type: `url`,
									},
								],
							},
							{
								name: `internalLink`,
								type: `object`,
								title: `Internal Link`,
								fields: [
									{
										name: `reference`,
										type: `reference`,
										title: `Reference`,
										to: [
											{ type: `page` },
											{ type: `musicProject` },
											{ type: `portfolioProject` },
											{ type: `post` },
											{ type: `person` },
											{ type: `landingPage` },
											{ type: `homePage` },
										],
									},
								],
							},
						],
					},
				},
				{ type: `codeBlock` },
				{ type: `mainImage` },
				{ type: `figmaEmbed` },
				{ type: 'fileDownload' },
			],
		},
	],
	preview: {
		select: {
			title: `content`,
			subtitle: `alignment`,
		},
	},
};
