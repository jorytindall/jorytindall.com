import { BiColumns } from "react-icons/bi"

interface TabsPreviewProps {
  tab1: string
  tab2: string
  tab3: string
  tab4: string
  tab5: string
}

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
  ],
  preview: {
    select: {
      tab1: 'tabs.0.label',
      tab2: 'tabs.1.label',
      tab3: 'tabs.2.label',
      tab4: 'tabs.3.label',
      tab5: 'tabs.4.label',
    },
    prepare: ({ tab1, tab2, tab3, tab4, tab5 }: TabsPreviewProps) => {
      const tabs = [tab1, tab2, tab3, tab4, tab5].filter(Boolean)
      const title = tabs.join(', ')
      return {
        title: `Tabs: ${title}` || 'Tabs'
      }
    }
  }
}