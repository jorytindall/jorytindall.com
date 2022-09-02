import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscriptionHook } from 'lib/sanity';
import { getClient, previewClient } from 'lib/sanity.server';
import { GET_BLOG_POSTS, GET_BLOG_POST_PATHS } from 'lib/queries';

export default function Event({ data, preview }) {
	const router = useRouter();

	const { data: post } = usePreviewSubscriptionHook(GET_BLOG_POSTS, {
		params: { slug: data.post?.slug },
		initialData: data.post,
		enabled: preview && data.post?.slug,
	});

	if (!router.isFallback && !data.post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	const { title } = post;

	return (
		<>
			<h1>{title}</h1>
		</>
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
	};
}

export async function getStaticPaths() {
	const paths = await getClient(previewClient).fetch(GET_BLOG_POST_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
