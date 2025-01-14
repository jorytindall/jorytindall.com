export interface SpeakingFrontmatter {
  title: string
  slug: string
  date: string
  conference: {
    title: string
    url: string
  }
  url: string
  deck?: string
  image: {
    asset: string
    alt: string
  }
  description: string
}