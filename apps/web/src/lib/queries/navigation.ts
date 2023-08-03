import { groq } from 'next-sanity'

export const GET_MAIN_MENU = groq``

export const GET_FOOTER = groq`
  *[_type == 'navigation'] {
    area,
    links->,
  }
`