export default {
    name: `input`,
    title: `Input`,
    type: `object`,
    fields: [
        {
            name: `type`,
            title: `Type`,
            type: `string`,
            options: {
                list: [
                    { title: `Name`, value: `name` },
                    { title: `Email`, value: `email` },
                    { title: `Phone Number`, value: `phoneNumber` },
                ],
                layout: `dropdown`,
            }
        },
        {
            name: `label`,
            title: `Label`,
            type: `string`,
        },
        {
            name: `placeholder`,
            title: `Placeholder`,
            type: `string`,
        },
    ]
}