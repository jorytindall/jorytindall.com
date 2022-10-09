export default {
    name: `featureItem`,
    title: `Feature Item`,
    type: `object`,
    fields: [
        {
            name: `title`,
            title: `Title`,
            type: `string`,
        },
        {
            name: `description`,
            title: `Description`,
            type: `text`,
        },
        {
            name: `image`,
            title: `Image`,
            type: `mainImage`,
        }
    ]
}