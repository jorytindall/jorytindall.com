import { BiLink} from 'react-icons/bi';

export default {
  name: 'link',
  type: 'object',
  title: 'Link',
  icon: BiLink,
  fields: [
    {
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'Custom Internal', value: 'customInternal' },
          { title: 'External', value: 'external' }
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'text',
      type: 'string',
      title: 'Text',
      description: 'The text to display for the link.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'internalLink',
      type: 'reference',
      title: 'Internal Link',
      to: [
        { type: 'page' },
        { type: 'post' },
        { type: 'event' },
        { type: 'landingPage' },
        { type: 'musicProject' },
        { type: 'portfolioProject' },
        { type: 'talk' },
      ],
      hidden: ({ parent }: any) => parent?.type !== 'internal'
    },
    {
      name: 'externalLink',
      type: 'url',
      title: 'External Link',
      description: 'The URL to link to.',
      hidden: ({ parent }: any) => parent?.type !== 'external'
    },
    {
      name: 'customLink',
      type: 'string',
      title: 'Custom Link',
      description: 'The URL to link to.',
      hidden: ({ parent }: any) => parent?.type !== 'customInternal'
    }
  ]
}