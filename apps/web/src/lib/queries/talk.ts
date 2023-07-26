import { groq } from 'next-sanity'

export const GET_TALKS = groq`
  *[_type == 'talk' && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    date,
    link,
    deck,
    conference,
    conferenceLink,
    moduleContent,
    image,
  }
`;

export const GET_TALK_PATHS = groq`
  *[_type == 'talk' && defined(slug.current)][].slug.current
`;

export const GET_ALL_TALKS = groq`
  *[_type == 'talk'][] {
    _id,
    title,
    "slug": slug.current,
    description,
    date,
  }
`;