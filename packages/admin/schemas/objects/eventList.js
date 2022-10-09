import { BiCalendar } from 'react-icons/bi'

export default {
    name: 'eventList',
    title: 'Event List',
    type: 'object',
    icon: BiCalendar,
    fields: [
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                {
                    type: 'eventListItem'
                }
            ]
        }
    ],
    preview: {
        select: {
            project0: 'items.0.eventListItem.title',
            project1: 'items.1.eventListItem.title',
            project2: 'items.2.eventListItem.title',
            project3: 'items.3.eventListItem.title',
        },
        prepare(selection) {
            
        }
    }
}