import { BiDetail } from "react-icons/bi"

export default {
    name: `calloutBlock`,
    title: `Callout Block`,
    type: `object`,
    icon: BiDetail,
    fields: [
        {
            name: `headline`,
            title: `Headline`,
            type: `string`,
        },
        {
            name: `subheadline`,
            title: `Subheadline`,
            type: `string`,
        },
        {
            name: `content`,
            title: `Content`,
            type: `array`,
            of: [
                {
                    type: `block`,
                    title: `Block`,
                    styles: [
                        { title: `Normal`, value: `normal` }
                    ],
                    marks: {
                        decorators: [
                            { title: `Strong`, value: `strong` },
                            { title: `Emphasis`, value: `em` }
                        ]
                    }
                }
            ]
        }
    ]
}