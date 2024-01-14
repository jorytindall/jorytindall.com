const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const webPath = `dist/web/`;

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
console.log(`cleaning ${webPath}...`);
fs.removeSync(webPath);

// const styleDictionary = StyleDictionary.extend({
// });

const modes = ['light', 'dark'];

console.log('☀️ Building light mode...');

StyleDictionary.extend({
	source: [
		// this is saying find any files in the tokens folder
		// that does not have .dark or .light, but ends in .json
		// `tokens/**/!(*.${modes.join(`|*.`)}).json`,
		`tokens/**/!(*.dark).json`
	],

	platforms: {
		css: {
			transformGroup: `css`,
			buildPath: webPath,
			files: [{
				destination: `tokens.css`,
				format: `css/variables`,
				options: {
					outputReferences: true
				}
			}]
		},

		scss: {
			transformGroup: `scss`,
			buildPath: webPath,
			files: [{
				destination: `tokens.scss`,
				format: `scss/variables`,
				options: {
					outputReferences: true
				}
			}]
		},

		js: {
			transformGroup: `web`,
			buildPath: webPath,
			files: [{
				destination: `tokens.json`,
				format: `json/flat`
			}]
		},
	}
}).buildAllPlatforms();

console.log('🌑 Building dark mode...');

StyleDictionary.extend({
	// include: [
	// 	// `tokens/**/!(*.${modes.join(`|*.`)}).json`
	// 	`tokens/**/!(*.light).json`
	// ],
	source: [
		// `tokens/**/*.dark.json`
		`tokens/**/!(*.light).json`
	],
	platforms: {
		css: {
			transformGroup: `css`,
			buildPath: webPath,
			files: [{
				destination: `tokens-dark.css`,
				format: `css/variables`,
				// only putting in the tokens from files with '.dark' in the filepath
				// filter: (token) => token.filePath.indexOf(`.dark`) > -1,
				options: {
					outputReferences: true
				}
			}]
		},

		scss: {
			transformGroup: `scss`,
			buildPath: webPath,
			files: [{
				destination: `tokens-dark.scss`,
				format: `scss/variables`,
				options: {
					outputReferences: true
				}
			}]
		},
	}
}).buildAllPlatforms();

// module.exports = {
// 	source: [`tokens/**/*.json`],
// 	transform: {},
// 	platforms: {
// 		web: {
// 			transformGroup: 'css',
// 			buildPath: './dist/web/',
// 			files: [
// 				{
// 					destination: 'tokens.scss',
// 					format: 'scss/variables',
// 				},
// 				{
// 					destination: 'tokens.css',
// 					format: 'css/variables',
// 				},
// 			],
// 		},
// 	},
// };
