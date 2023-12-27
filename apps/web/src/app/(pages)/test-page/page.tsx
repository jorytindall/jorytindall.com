import {client} from '../../../utils/sanity/sanityClient'

type Page = {
  _id: string
  title?: string
  slug?: {
    current: string
  }
}

export default async function TestPage() {
  const pages = await client.fetch(`*[_type == "page"]`)

  return (
    <ul>
      {pages.map((page) => (
        <li key={page._id}>{page.title}</li>
      ))}
    </ul>
  )
}