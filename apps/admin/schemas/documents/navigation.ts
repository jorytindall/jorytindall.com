import { BiCompass } from "react-icons/bi"

const areas = [
  { title: 'Header', value: 'header' },
  { title: 'Footer', value: 'footer' }
]

export default {
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  icon: BiCompass,
  fields: [
    {
      name: 'area',
      type: 'string',
      title: 'Area',
      options: {
        list: areas,
        layout: 'dropdown'
      },
      validation: (Rule: any) => Rule.required()
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
      title: 'area',
    },
  }
}