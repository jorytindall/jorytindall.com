import { groq } from 'next-sanity';

export const GET_MUSIC_PROJECTS = groq`
    *[_type == 'musicProject' && slug.current == $slug][0] {
        _id,
        title,
        description,
        "slug": slug.current,
        pressKit,
        musicians[]->,
        moduleContent[] {
            ...,
            items[] {
                item->
            }
        }
    }
`;

export const GET_MUSIC_PROJECT_PATHS = groq`
    *[_type == 'musicProject' && defined(slug.current)][].slug.current
`;

export const GET_ALL_MUSIC_PROJECTS = groq`
    *[_type == 'musicProject'][] {
        _id,
        title,
        description,
        "slug": slug.current,
        image,
    }
`
