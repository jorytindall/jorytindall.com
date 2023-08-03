import { BiLink } from 'react-icons/bi'

export default {
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: BiLink,
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Type of the link, either internal or external',
      options: {
        list: [
          { value: 'internal', title: 'Internal' },
          { value: 'external', title: 'External' },
          { value: 'customInternal', title: 'Custom Internal' },
        ]
      }
    },
    {
      name: 'internalLink',
      title: 'Internal link',
      type: 'reference',
      hidden: ({ parent }: any) => parent?.type !== 'internal',
      to: [
        { type: 'event', name: 'event' },
        { type: 'page', name: 'page' },
        { type: 'portfolioProject', name: 'portfolioProject' },
        { type: 'post', name: 'post' },
        { type: 'talk', name: 'talk' },
        { type: 'musicProject', name: 'musicProject' },
        { type: 'landingPage', name: 'landingPage' }
      ]
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      hidden: ({ parent }: any) => parent?.type !== 'external',
    },
    {
      name: 'customInternalLink',
      title: 'Custom Internal Link',
      type: 'string',
      hidden: ({ parent }: any) => parent?.type !== 'customInternal',
    },
    {
      name: 'target',
      title: 'Link target',
      type: 'string',
      description: 'Determine what the browser functionality of the link is.',
      options: {
        list: [
          { value: '_self', title: 'Self (default)' },
          { value: '_blank', title: 'Blank' },
          { value: '_parent', title: 'Parent' },
          { value: '_top', title: 'Top' }
        ]
      }
    },
  ]
}