import { getClient } from 'lib/sanity.server';
import { GET_ALL_BLOG_POSTS } from 'lib/queries';
import { PostWrapper } from 'components/blog';
import { Headline } from 'components/typography';
import { MetaHead } from 'components/meta';
import styles from 'styles/pages/Blog.module.scss';
import { linkResolver } from 'utils/linkResolver';

export default function Blog({ data }) {
	const posts = data.posts.map((post) => {
		return (
			<PostWrapper
				key={post._id}
				title={post.title}
				excerpt={post.excerpt}
				link={linkResolver('post', post.slug)}
			/>
		);
	});

	return (
		<>
			<MetaHead
				title="Blog"
				description="Recent blog posts and writings"
				slug="blog"
			/>
			<section className={styles.wrapper}>
				<Headline type="h3" collapse>
					Recent posts
				</Headline>
				{posts}
			</section>
		</>
	);
}

export async function getStaticProps({ preview = false }) {
	const posts = await getClient(preview).fetch(GET_ALL_BLOG_POSTS);

	return {
		props: {
			preview,
			data: { posts },
		},
	};
}
