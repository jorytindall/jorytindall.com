import { groq } from 'next-sanity';

export const GET_BLOG_POSTS = groq`
    *[_type == 'post' && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        publishedDate,
        featuredImage,
        author,
        categories[]->,
        excerpt,
        "content": content.content,
    }
`;

export const GET_BLOG_POST_PATHS = groq`
    *[_type == 'post' && defined(slug.current)][].slug.current
`;

export const GET_ALL_BLOG_POSTS = groq`
    *[_type == 'post'][] {
        _id,
        title,
        "slug": slug.current,
        publishedDate,
        excerpt,
    }
`;
