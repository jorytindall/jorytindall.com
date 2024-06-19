import { BiColumns } from "react-icons/bi"

export default {
  name: 'tabs',
  title: 'Tabs',
  type: 'object',
  icon: BiColumns,
  fields: [
    {
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      of: [{ type: 'tab' }]
    }
  ]
}