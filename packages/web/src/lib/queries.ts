import { groq } from 'next-sanity';

// Page queries

export const GET_PAGES = groq`
    *[_type == 'page' && slug.current == $slug][0] {
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

// Portfolio Queries

export const GET_PORTFOLIO_PROJECTS = groq`
    *[_type == 'portfolioProject' && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        client,
        tools,
        timeline,
        types,
        overview,
        externalLink,
        roles,
        shareImage {
            asset {
                url
            }
        },
        featuredImage {
            alternativeText,
            asset
        },
        moduleContent
    }
`;

export const GET_PORTFOLIO_PROJECT_PATHS = groq`
    *[_type == 'portfolioProject' && defined(slug.current)][].slug.current
`;

// Blog queries

export const GET_BLOG_POSTS = groq`
    *[_type == 'post' && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
    }
`;

export const GET_BLOG_POST_PATHS = groq`
    *[_type == 'post' && defined(slug.current)][].slug.current
`;

// Event Queries

export const GET_EVENTS = groq`
    *[_type == 'event' && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
    }
`;

export const GET_EVENT_PATHS = groq`
    *[_type == 'event' && defined(slug.current)][].slug.current
`;

export const GET_ALL_EVENTS = groq`
    *[_type == 'event'][] {
        _id,
        title,
        "slug": slug.current,
        date,
        image,
        location
    }
`

// Music queries

export const GET_MUSIC_PROJECTS = groq`
    *[_type == 'musicProject' && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
    }
`;

export const GET_MUSIC_PROJECT_PATHS = groq`
    *[_type == 'musicProject' && defined(slug.current)][].slug.current
`;

// Landing page queries

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
