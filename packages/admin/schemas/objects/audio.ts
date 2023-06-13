import { BiMusic } from 'react-icons/bi'

export default {
  name: `audio`,
  title: `Audio`,
  type: `object`,
  icon: BiMusic,
  description: 'Audio or music file.',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => {
        Rule.required().error('The audio must have a title.')
      }
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'string',
      validation: (Rule: any) => {
        Rule.required().error('The audio must have an artist.')
      }
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      validation: (Rule: any) => {
        Rule.required().error('You must upload a file.')
      }
    }
  ]
}