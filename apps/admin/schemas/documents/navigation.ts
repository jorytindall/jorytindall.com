import { BiNavigation } from 'react-icons/bi'

export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  icon: BiNavigation,
  fields: [
    {
      name: 'area',
      title: 'Area',
      type: 'string',
      options: {
        list: [
          { title: 'Main', value: 'main' },
          { title: 'Footer', value: 'footer' }
        ]
      }
    },
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          name: 'link',
          type: 'link',
          title: 'Link'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'area',
    }
  }
}