import { BiLayout } from "react-icons/bi"

export default {
    name: `features`,
    title: `Features`,
    type: `object`,
    icon: BiLayout,
    description: `Collection of features to highlight with images and descriptions.`,
    fields: [
        {
            name: `title`,
            title: `Title`,
            type: `string`
        },
        {
            name: `columns`,
            title: `Columns`,
            type: `number`,
            description: `Number of columns in the features. Will automatically shrink based on viewport.`,
        },
        {
            name: `featureItems`,
            title: `Feature Items`,
            type: `array`,
            of: [
                {
                    type: `featureItem`,
                }
            ]
        }
    ]
}