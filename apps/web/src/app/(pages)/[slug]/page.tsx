import { notFound } from 'next/navigation';
import { sanityClient } from 'lib/sanity/sanityClient';
import { GET_PAGES, GET_PAGE_PATHS } from 'lib/queries';

import { PageTitle } from 'app/components/page-title';
import { Headline } from 'app/components/typography';
import { ModuleRenderer } from 'app/components/module-renderer';

// Revalidate events every minute
export const revalidate = 60;

// Generate metadata
export async function generateMetadata({ params }) {
	const { slug } = params;
	const client = sanityClient;
	const page = await client.fetch(GET_PAGES, {
		slug,
	});

	return {
		title: `${page.title} | Jory Tindall`,
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
	const { slug } = params;
	const page = await sanityClient.fetch(GET_PAGES, { slug });

	const { title, megaHeadline, moduleContent } = page;

	if (!page) {
		return notFound();
	}

	return (
		<>
			{page.megaHeadline !== null ? (
				<PageTitle title={page.title} megaTitle={page.megaHeadline} />
			) : null}
			{megaHeadline === null ? (
				<Headline tag="h1">{title}</Headline>
			) : null}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</>
	);
}
