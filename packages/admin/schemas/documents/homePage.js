import { BiHome } from "react-icons/bi"

export default {
    name: `homePage`,
    title: `Home Page`,
    type: `document`,
    icon: BiHome,
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
            initialValue: `/`,
            readOnly: true
        },
        {
            name: `moduleContent`,
            title: `Module Content`,
            type: `moduleContent`,
        }
    ],
    preview: {
        select: {
            title: `title`,
            subtitle: `modeulContent`,
        }
    }
}