import { groq } from 'next-sanity';

export const GET_HOMEPAGE_DATA = groq`
  *[_type == 'event'][] {
    _id,
    title,
    "slug": slug.current,
    description,
    date
  } | order(date asc)
`;
