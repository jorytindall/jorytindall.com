import { BiFile } from "react-icons/bi"

export default {
    name: `page`,
    title: `Page`,
    type: `document`,
    icon: BiFile,
    fields: [
        {
            name: `title`,
            title: `Title`,
            type: `string`,
            description: `Title of the page`,
            validation: Rule => [
                Rule.required().error(`The page must have a title.`)
            ]
        },
        {
            name: `showTitle`,
            title: `Show Title`,
            type: `boolean`,
            description: `Choose whether to show the title of the page or not. Defaults to true.`
        },
        {
            name: `slug`,
            title: `Slug`,
            type: `slug`,
            description: `Slug or URL of the page.`,
            options: {
                source: `title`,
            },
            validation: Rule => [
                Rule.required().error(`The page must have a title.`)
            ]
        },
        {
            name: `megaHeadline`,
            title: `Mega Headline`,
            type: `string`,
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
            name: `moduleContent`,
            type: `moduleContent`,
        }
    ]
}