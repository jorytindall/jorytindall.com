import { groq } from 'next-sanity'

export const GET_PRESS_KITS = groq`
  *[_type == 'pressKit' && slug.current == $slug][0] {
    _id,
    _key,
    title,
    "slug": slug.current,
    project,
    featuredImage {
      alternativeText,
      asset,
    },
    moduleContent,
  }
`;

export const GET_PRESS_KIT_PATHS = groq`
  *[_type == 'pressKit' && defined(slug.current)][].slug.current
`;

export const GET_ALL_PRESS_KITS = groq`
  *[_type == 'pressKit'][] {
    _id,
    title,
    "slug": slug.current,
  }
`;