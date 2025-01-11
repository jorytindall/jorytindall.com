export interface EventImage {
  src?: string
  alt?: string
}

export interface EventFrontmatter {
  title: string
  slug: string
  project?: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location: string
  url?: string
  image?: EventImage
}

export interface EventData extends EventFrontmatter {
  content: React.ReactElement
}