import { BiSolidMegaphone } from "react-icons/bi";

export default { 
  name: 'pressKit',
  title: 'Press kit',
  type: 'document',
  icon: BiSolidMegaphone,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the press kit',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'person' }]
    },
    {
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{ type: 'musicProject' }]
    },
    {
      name: 'shareImage',
      title: 'Share Image',
      type: 'image',
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'mainImage',
    },
    {
      name: 'moduleContent',
      type: 'moduleContent',
    }
  ]
}