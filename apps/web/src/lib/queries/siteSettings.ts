import { groq } from 'next-sanity';

export const GET_SITE_SETTINGS_DATA = groq`
  *[_type == "siteSettings"] {
    _id,
    siteTitle,
    description,
    "socialLinks": socialLinks[] {
      _key,
      platform,
      text,
      link,
    }
  }
`