import { groq } from 'next-sanity';

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
