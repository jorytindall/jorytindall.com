import { sanityClient } from "lib/sanity/sanityClient";
import { GET_ALL_BLOG_POSTS } from "lib/queries";
import { PostWrapper } from "app/components/blog";
import { Headline } from "app/components/typography";
import { linkResolver } from "utils/linkResolver";
import styles from 'styles/pages/Blog.module.scss';

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Blog | Jory Tindall',
    description: 'Recent blog posts and writings',
}

export async function generateStaticParams() {
    const client = sanityClient
    const blogPosts = await client.fetch(GET_ALL_BLOG_POSTS, {
        next: {
            revalidate: 60,
        },
    })
    return blogPosts;
}

export default async function Blog() {

    const client = sanityClient
    const blogPosts = await client.fetch(GET_ALL_BLOG_POSTS)

    const posts = blogPosts.map((post) => {
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
        <section className={styles.wrapper}>
            <Headline tag="h3" collapse>
                Recent posts
            </Headline>
            {posts}
        </section>
    );
}