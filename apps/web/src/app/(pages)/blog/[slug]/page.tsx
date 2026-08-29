import { notFound } from 'next/navigation';
import { sanityClient } from 'lib/sanity/config';
import { sanityFetch } from 'lib/sanity/fetch';
import { GET_BLOG_POSTS, GET_BLOG_POST_PATHS } from 'lib/queries';
import { BlogTitle } from 'components/blog';
import { RichText } from 'components/rich-text';
import { GridWrapper, RichTextWrapper } from 'components/layout';

// Revalidate events every minute
export const revalidate = 60;

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const post = await sanityFetch(GET_BLOG_POSTS, { slug }, { stega: false });

	if (!post) {
		return { title: '404: Not found' };
	}

	return {
		title: post.title,
	};
}

export async function generateStaticParams() {
	const client = sanityClient;
	const slugs = await client.fetch(GET_BLOG_POST_PATHS);
	return slugs.map((slug) => ({ slug }));
}

export default async function BlogPost({ params }) {
	const { slug } = await params;
	const post = await sanityFetch(GET_BLOG_POSTS, { slug });

	// An unresolvable slug would otherwise throw on destructuring below.
	if (!post) {
		notFound();
	}

	const { title, featuredImage, categories, content } = post;

	return (
		<>
			<BlogTitle featuredImage={featuredImage} title={title} categories={categories} />
			{content && (
				<GridWrapper>
					<RichTextWrapper>
						<RichText value={content} />
					</RichTextWrapper>
				</GridWrapper>
			)}
		</>
	);
}
