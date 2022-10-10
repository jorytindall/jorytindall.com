import { groq } from 'next-sanity';

export const GET_LANDING_PAGES = groq`
    *[_type == 'landingPage' && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
    }
`;

export const GET_LANDING_PAGE_PATHS = groq`
    *[_type == 'landingPage' && defined(slug.current)][].slug.current
`;
