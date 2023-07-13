import { groq } from 'next-sanity';

export const GET_SITEMAP = groq`
    {
        "pages": *[
            _type == 'page' || 
            _type == 'post' ||
            _type == 'portfolioProject' ||
            _type == 'event' ||
            _type == 'landingPage' ||
            _type == 'musicProject'
        ] {
            _type,
            slug
        },
    }
`;
