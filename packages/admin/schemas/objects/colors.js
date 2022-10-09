export default {
    name: `colors`,
    title: `Colors`,
    type: `object`,
    fields: [
        {
            name: `colors`,
            title: `Colors`,
            type: `colorlist`,
            options: {
                borderradius: {
                    inner: `100%`,
                    outer: `100%`,
                },
                list: [
                    { title: `Transparent`, value: `transparent` },
                    { title: `Primary`, value: `#005EFF` },
                    { title: `Secondary`, value: `#FFC551` },
                    { title: `Tertiary`, value: `#FFD8D9` },
                    { title: `Dark`, value: `#160F29` },
                    { title: `White`, value: `#FFFFFF` },
                ]
            }
        }
    ]
}