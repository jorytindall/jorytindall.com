import { FiFigma } from 'react-icons/fi'

export default {
    name: `figmaEmbed`,
    title: `Figma Embed`,
    type: `object`,
    description: `Embed a file or prototype from Figma.`,
    icon: FiFigma,
    fields: [
        {
            name: `title`,
            title: `Title`,
            type: `string`,
        },
        {
            name: `description`,
            title: `Description`,
            type: `string`,
        },
        {
            name: `figmaUrl`,
            title: `Figma URL`,
            type: `url`,
            description: `Enter the 'Share' URL from within Figma. Ensure the link is available to users outside of the Figma organization.`
        }
    ]
}
