import { groq } from 'next-sanity';

export const GET_PAGES = groq`
    *[_type == "page" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        showTitle,
        megaHeadline,
        moduleContent[] {
            ...,
            items[] {
                item->
            }
        }
    }
`;

export const GET_PAGE_PATHS = groq`
    *[_type == "page" && defined(slug.current)][].slug.current
`;
