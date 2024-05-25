import { BiCompass } from "react-icons/bi"

export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  icon: BiCompass,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      options: {
        list: [
          { title: 'Header', value: 'header' },
          { title: 'Footer', value: 'footer' }
        ]
      }
    },
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [{ type: 'navItem' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
}