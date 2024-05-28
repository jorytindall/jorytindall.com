import { sanityClient } from 'lib/sanity/sanityClient';
import { GET_BLOG_POSTS, GET_BLOG_POST_PATHS } from 'lib/queries';
import { BlogTitle } from 'components/blog';
import { RichText } from 'components/rich-text';
import { GridWrapper, RichTextWrapper } from 'components/layout';

// Revalidate events every minute
export const revalidate = 60;

export async function generateMetadata({ params }) {
	const { slug } = params;
	const post = await sanityClient.fetch(GET_BLOG_POSTS, { slug });

	return {
		title: `${post.title} | Jory Tindall`,
	};
}

export async function generateStaticParams() {
	const client = sanityClient;
	const slugs = await client.fetch(GET_BLOG_POST_PATHS);
	return slugs.map((slug) => ({ slug }));
}

export default async function BlogPost({ params }) {
	const { slug } = params;
	const post = await sanityClient.fetch(GET_BLOG_POSTS, { slug });

	const { title, featuredImage, categories, content } = post;

	return (
		<>
			<BlogTitle
				featuredImage={featuredImage}
				title={title}
				categories={categories}
			/>
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
