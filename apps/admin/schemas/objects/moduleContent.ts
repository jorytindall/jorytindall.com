import { defineType } from 'sanity';

export default defineType({
	name: `moduleContent`,
	title: `Module Content`,
	type: `array`,
	of: [
		{ type: `gallery` },
		{ type: `fullWidthImage` },
		{ type: `richText` },
		{ type: `portfolioList` },
		{ type: `results` },
		{ type: `features` },
		{ type: `tabs` },
		{ type: `stravaStats` },
		{ type: `personalStats` },
	],
});
