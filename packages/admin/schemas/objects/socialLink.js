export default {
    name: `socialLink`,
    title: `Social Link`,
    type: `object`,
    fields: [
        {
            name: `platform`,
            title: `Platform`,
            type: `string`,
            description: `Select a social platform type.`,
            options: {
                list: [
                    { title: `Facebook`, value: `facebook` },
                    { title: `Instagram`, value: `instagram` },
                    { title: `LinkedIn`, value: `linkedIn` },
                    { title: `Twitter`, value: `twitter` },
                    { title: `YouTube`, value: `youTube` },
                    { title: `TikTok`, value: `tiktok` },
                    { title: `Behance`, value: `behance` },
                    { title: `Dribbble`, value: `dribbble` }
                ],
                layout: `dropdown`
            }
        },
        {
            name: `link`,
            title: `Link`,
            type: `url`,
            description: `Link to the social account.`
        }
    ],
    preview: {
        select: {
            title: `platform`,
            subtitle: `link`
        }
    }
}