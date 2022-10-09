export default {
    name: `portfolioListItem`,
    title: `Portfolio List Item`,
    type: `object`,
    fields: [
        {
            name: `item`,
            title: `Item`,
            type: `reference`,
            to: [
                { type: `portfolioProject` }
            ]
        }
    ],
    preview: {
        select: {
            title: `item.title`,
            subtitle: `item.client`,
            media: `item.featuredImage`,
        }
    }
}