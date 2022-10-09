import { BiFlag } from "react-icons/bi"

export default {
    name: `landingPage`,
    title: `Landing Page`,
    type: `document`,
    icon: BiFlag,
    fields: [
        {
            name: `title`,
            title: `Title`,
            type: `string`,
        },
        {
            name: `slug`,
            title: `Slug`,
            type: `slug`,
            options: {
                source: `title`,
            }
        },
        {
            name: `author`,
            title: `Author`,
            type: `reference`,
            to: [
                { type: `person` }
            ]
        },
        {
            name: `modulecContent`,
            type: `moduleContent`,
        }
    ]
}