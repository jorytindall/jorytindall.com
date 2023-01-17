import { BiEnvelope } from 'react-icons/bi';

export default {
	name: `form`,
	title: `Form`,
	type: `object`,
	icon: BiEnvelope,
	fields: [
		{
			name: `title`,
			title: `Title`,
			type: `string`,
			description: `Title of the form.`,
		},
		{
			name: `method`,
			title: `Method`,
			type: `string`,
			options: {
				list: [`POST`, `GET`],
				display: `horizontal`,
				layout: `radio`,
			},
		},
		{
			name: `netlify`,
			title: `Netlify`,
			type: `boolean`,
			description: `Is this form collecting submits through Netlify?`,
		},
		{
			name: `action`,
			title: `Page Action`,
			type: `reference`,
			description: `Where should the form direct to on a successful submission?`,
			to: [{ type: `page` }],
		},
		{
			name: `fields`,
			title: `Fields`,
			type: `array`,
			of: [{ type: `input` }, { type: `textarea` }, { type: `submit` }],
		},
	],
};
