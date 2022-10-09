import { BiPaint } from "react-icons/bi"

export default {
    name: `portfolioList`,
    title: `Portfolio List`,
    type: `object`,
    description: `List one or more portfolio items.`,
    icon: BiPaint,
    fields: [
        {
            name: `items`,
            title: `Items`,
            type: `array`,
            of: [
                {
                    type: `portfolioListItem`,
                }
            ]
        }
    ],
    preview: {
        select: {
            project0: `items.0.item.title`,
            project1: `items.1.item.title`,
            project2: `items.2.item.title`,
            project3: `items.3.item.title`,
        },
        prepare(selection) {
            const { project0, project1, project2, project3 } = selection
            return {
                title: `${project0}, ${project1}, ${project2}, ${project3}...`,
            }
        }
    }
}