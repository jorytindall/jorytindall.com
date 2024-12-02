import { groq } from 'next-sanity';

export const GET_HOMEPAGE_DATA = groq`
  *[_type == 'event'][] {
    _id,
    title,
    "slug": slug.current,
    description,
    date,
    location,
  } | order(date asc)
`;
