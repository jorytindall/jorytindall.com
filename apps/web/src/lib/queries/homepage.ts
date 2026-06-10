import { groq } from 'next-sanity';

export const GET_HOMEPAGE_DATA = groq`
  *[_type == 'event' && coalesce(endDate, (performances | order(date desc))[0].date, date) >= now()][] {
    _id,
    title,
    "slug": slug.current,
    description,
    eventFormat,
    date,
    endDate,
    performances[]{ _key, date, note },
    location,
  } | order(date asc)[0...5]
`;
