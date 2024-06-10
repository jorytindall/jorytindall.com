import { groq } from 'next-sanity';

export const GET_NAVIGATION_DATA = groq`
  *[_type == "navigation"] {
    _id,
    area,
    "links": items[] {
      _key,
      title,
      link,
    }
  }
`;