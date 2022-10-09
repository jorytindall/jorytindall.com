import { BiImage } from "react-icons/bi"

export default {
    name: `fullWidthImage`,
    title: `Full Width Image`,
    type: `object`,
    icon: BiImage,
    fields: [
        {
            name: `title`,
            title: `Title`,
            type: `string`,
        },
        {
            name: `image`,
            title: `Image`,
            type: `mainImage`
        },
        {
            name: `maxHeight`,
            title: `Max Height`,
            type: `number`,
            description: `Maximum height of the image.`
        }
    ]
}