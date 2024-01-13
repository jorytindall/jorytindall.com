module.exports = {
	source: [`tokens/**/*.json`],
	transform: {},
	platforms: {
		web: {
			transformGroup: 'css',
			buildPath: './dist/web/',
			files: [
				{
					destination: 'tokens.scss',
					format: 'scss/variables',
				},
				{
					destination: 'tokens.css',
					format: 'css/variables',
				},
			],
		},
	},
};
