import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscriptionHook } from 'lib/sanity';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_BLOG_POSTS, GET_BLOG_POST_PATHS } from 'lib/queries';
import { BlogTitle } from 'components/blog';
import { RichText } from 'components/rich-text';
import { Layout, GridWrapper, RichTextWrapper } from 'components/layout';
import { MetaHead } from 'components/meta';
import { linkResolver } from 'utils/linkResolver';

export default function Event({ data, preview }) {
	const router = useRouter();

	if (!router.isFallback && !data.post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const {
		title,
		slug,
		publishedDate,
		featuredImage,
		author,
		categories,
		excerpt,
		content,
	} = data.post;

	return (
		<Layout>
			<MetaHead
				title={title}
				slug={linkResolver('post', slug)}
				description={excerpt}
			/>
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
		</Layout>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const post = await getClient(preview).fetch(GET_BLOG_POSTS, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { post },
		},
		revalidate: 60,
	};
}

export async function getStaticPaths() {
	const paths = await getClient(previewClient).fetch(GET_BLOG_POST_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
