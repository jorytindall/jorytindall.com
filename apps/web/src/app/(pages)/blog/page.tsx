import { sanityClient } from 'lib/sanity/config';
import { GET_ALL_BLOG_POSTS } from 'lib/queries';
import { linkResolver } from 'utils/linkResolver';
import { ListItem } from 'components/list';

import type { Metadata } from 'next';
import { PageTitle } from 'components/page-title';
import { CenteredWrapper } from 'components/layout';
import { Paragraph } from 'components/typography';

// Revalidate events every minute
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Blog | Jory Tindall',
	description: 'Recent blog posts and writings',
};

export async function generateStaticParams() {
	const client = sanityClient;
	const blogPosts = await client.fetch(GET_ALL_BLOG_POSTS);
	return blogPosts;
}

export default async function Blog() {
	const client = sanityClient;
	const blogPosts = await client.fetch(GET_ALL_BLOG_POSTS);

	const posts = blogPosts.map((post) => {
		return (
			<ListItem
				title={post.title}
				link={linkResolver('post', post.slug)}
				key={post._id}
			>
				<Paragraph type="primary" color='secondary' collapse>{post.excerpt}</Paragraph>
			</ListItem>
		);
	});

	return (
		<>
			<PageTitle title="📝 Blog" megaTitle="Recent Posts" />
			<CenteredWrapper semanticElement="section">
				{posts}
			</CenteredWrapper>
		</>
	);
}
