import { BiBookmark } from "react-icons/bi"

export default {
    name: `banner`,
    title: `Banner`,
    type: `document`,
    icon: BiBookmark,
    fieldsets: [
        { name: `action`, title: `Action` }
    ],
    fields: [
        {
            name: `title`,
            title: `Title`,
            type: `string`,
            description: `Title for the banner, isn't rendered in the application.`
        },
        {
            name: `active`,
            title: `Active`,
            type: `boolean`,
            description: `Is the banner active?`
        },
        {
            name: `content`,
            title: `Content`,
            type: `array`,
            description: `The content to be displayed within the banner. Generally best to keep to a single line.`,
            of: [
                {
                    type: `block`,
                    title: `Block`,
                    styles: [
                        { title: `Normal`, value: `normal` },
                    ],
                    marks: {
                        decorators: [
                            { title: `Strong`, value: `strong` },
                            { title: `Emphasis`, value: `em` },
                        ],
                        annotations: [
                            {
                                name: `link`,
                                type: `object`,
                                title: `URL`,
                                fields: [
                                  {
                                    title: `URL`,
                                    name: `href`,
                                    type: `url`,
                                  },
                                ],
                              },
                              {
                                name: `internalLink`,
                                type: `object`,
                                title: `Internal Link`,
                                fields: [
                                  {
                                    name: `reference`,
                                    type: `reference`,
                                    title: `Reference`,
                                    to: [
                                      { type: `page` },
                                      { type: `musicProject` },
                                      { type: `portfolioProject` },
                                      { type: `post` },
                                      { type: `person` },
                                      { type: `landingPage` },
                                      { type: `homePage` },
                                    ]
                                  }
                                ]
                            }
                        ]
                    },
                }
            ]
        },
    ],
}