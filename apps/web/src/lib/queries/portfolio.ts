import { groq } from 'next-sanity';

export const GET_PORTFOLIO_PROJECTS = groq`
    *[_type == 'portfolioProject' && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        isPasswordProtected,
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
        parentProject-> {
            title,
            "slug": slug.current
        },
        "chapters": *[_type == 'portfolioProject' && parentProject._ref == ^._id] | order(chapterOrder asc, title asc) {
            _id,
            title,
            "slug": slug.current,
            client,
            overview,
            featuredImage {
                alternativeText,
                asset
            },
            galleryImages[] {
                alternativeText,
                caption,
                asset
            }
        },
        moduleContent[] {
            ...,
            items[] {
                item-> {
                    ...,
                    galleryImages[] {
                        alternativeText,
                        caption,
                        asset
                    }
                }
            }
        }
    }
`;

export const GET_PORTFOLIO_PROJECT_PATHS = groq`
    *[_type == 'portfolioProject' && defined(slug.current)][].slug.current
`;
