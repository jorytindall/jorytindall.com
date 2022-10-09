export default {
    name: `siteSettings`,
    title: `Site Settings`,
    type: `document`,
    fields: [
        {
            name: `title`,
            title: `Site Title`,
            type: `string`,
            description: `Default meta title for the site.`
        },
        {
            name: `description`,
            title: `Description`,
            type: `string`,
            description: `Default meta description for the site.`
        },
        {
            name: `socialLinks`,
            title: `Social Links`,
            type: `array`,
            description: `Link to social platforms.`,
            of: [   
                {
                    name: `socialLink`,
                    title: `Social Link`,
                    type: `socialLink`
                }
            ]
        }
    ]
}