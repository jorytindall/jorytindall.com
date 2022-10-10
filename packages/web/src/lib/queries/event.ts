import { groq } from 'next-sanity';

export const GET_EVENTS = groq`
    *[_type == 'event' && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        date,
        image,
        location,
        description,
        url
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
        location,
        description,
    }
`;
