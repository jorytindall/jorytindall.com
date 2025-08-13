import { groq } from 'next-sanity';

export const GET_HOMEPAGE_DATA = groq`
  *[_type == 'event' && date >= now()][] {
    _id,
    title,
    "slug": slug.current,
    description,
    date,
    location,
  } | order(date asc)[0...5]
`;
