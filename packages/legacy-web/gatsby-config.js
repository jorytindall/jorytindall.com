require(`dotenv`).config({
	path: `.env.${process.env.NODE_ENV || `development`}`,
});

const clientConfig = require(`./clientConfig`);

const isProd = process.env.NODE_ENV === `production`;

module.exports = {
	siteMetadata: {
		title: `Jory Tindall`,
		description: `Personal website and portfolio for musician and designer Jory Tindall`,
		author: `Jory Tindall`,
		siteUrl: `https://jorytindall.com`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-styled-components`,
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-netlify`,
		`gatsby-plugin-robots-txt`,
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `jorytindall`,
				short_name: `jorytindall`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/avatar-favicon.png`,
			},
		},
		{
			resolve: `gatsby-source-sanity`,
			options: {
				...clientConfig.sanity,
				token: process.env.SANITY_AUTH_TOKEN,
				watchMode: true,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `image`,
				path: `${__dirname}/src/images/`,
			},
		},
		{
			resolve: `gatsby-plugin-fathom`,
			options: {
				siteId: process.env.FATHOM_TRACKING_ID,
			},
		},
		{
			resolve: `@mkitio/gatsby-theme-password-protect`,
			options: {
				password: `password`,
				pagePaths: [
					'/portfolio/reenvisioning-design-systems-at-t-mobile',
				],
			},
		},
	],
};
