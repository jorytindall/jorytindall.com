import { notFound } from 'next/navigation';
import { sanityClient } from 'lib/sanity/config';
import { sanityFetch } from 'lib/sanity/fetch';
import { GET_PAGES, GET_PAGE_PATHS } from 'lib/queries';

import { PageTitle } from 'components/page-title';
import { Headline } from 'components/typography';
import { ModuleRenderer } from 'components/module-renderer';

// Revalidate events every minute
export const revalidate = 60;

// Generate metadata
export async function generateMetadata({ params }) {
	const { slug } = await params;
	const page = await sanityFetch(GET_PAGES, { slug }, { stega: false });

	if (!page) {
		return { title: '404: Not found' };
	}

	return {
		title: page.title,
	};
}

// Generate static paths for prerendering
export async function generateStaticParams() {
	const client = sanityClient;
	const slugs = await client.fetch(GET_PAGE_PATHS);
	return slugs.map((slug) => ({ slug }));
}

// Generate page
export default async function Page({ params }) {
	const { slug } = await params;
	const page = await sanityFetch(GET_PAGES, { slug });

	// An unresolvable slug would otherwise throw on destructuring below.
	if (!page) {
		notFound();
	}

	const { title, megaHeadline, moduleContent } = page;

	return (
		<>
			{page.megaHeadline !== null ? (
				<PageTitle title={page.title} megaTitle={page.megaHeadline} />
			) : null}
			{megaHeadline === null ? <Headline tag="h1">{title}</Headline> : null}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</>
	);
}
