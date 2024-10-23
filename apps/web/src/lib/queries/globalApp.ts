import { groq } from 'next-sanity';

export const GET_GLOBAL_APP_DATA = groq`{
  "banner": *[_type == "banner" && active == true][0] {
    _id,
    title,
    active,
    content,
    link {
      type,
      text,
      target,
      internalLink-> {
        _type,
        "slug": slug.current,
      },
      customLink,
      externalLink,
    }
  },
  "navigation": *[_type == "navigation"] {
    _id,
    area,
    "links": items[] {
      _key,
      title,
      link
    }
  },
  "siteSettings": *[_type == "siteSettings"][0] {
    _id,
    siteTitle,
    description,
    "socialLinks": socialLinks[] {
      _key,
      platform,
      text,
      link
    }
  }
}`
