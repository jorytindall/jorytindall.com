import { BiFile } from 'react-icons/bi'

export default { 
  name: 'tab',
  title: 'Tab',
  type: 'object',
  icon: BiFile,
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'richText' }]
    }
  ]
}