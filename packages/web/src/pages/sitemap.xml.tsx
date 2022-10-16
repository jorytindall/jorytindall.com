import { sanityClient } from 'lib/sanity.server';
import { GET_SITEMAP } from 'lib/queries/sitemap';
import { linkResolver } from 'utils/linkResolver';

export default function SiteMap() {
	return <div>Loading...</div>;
}

export async function getServerSideProps({ res }) {
	const URL = 'https://jorytindall.com/';
	const dynamicData = await sanityClient.fetch(GET_SITEMAP);
	const staticData = [
		{
			_type: 'home',
			slug: { current: '' },
		},
		{
			_type: '404',
			slug: { current: '404' },
		},
		{
			_type: 'events',
			slug: { current: 'events' },
		},
		{
			_type: 'blog',
			slug: { current: 'blog' },
		},
		{
			_type: 'music',
			slug: { current: 'music' },
		},
		{
			_type: 'portfolio',
			slug: { current: 'portfolio' },
		},
	];

	const data = staticData.concat(dynamicData.pages);

	const pages = data.map((page) => {
		const slug = page ? linkResolver(page._type, page.slug.current) : '';
		return `
	        <loc>${URL}${slug}</loc>
	        <changfreq>daily</changfreq>
	        <priority>0.7</priority>
	    `;
	});

	const sitemapData = [...pages];
	const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${sitemapData
				.map((each) => {
					return `<url>${each}</url>`;
				})
				.join('')}
        </urlset>`;

	res.setHeader('Content-Type', 'text/xml');
	res.write(createSitemap());
	res.end();
	return {
		props: {},
	};
}
