import { BiHeart } from 'react-icons/bi'

export default {
    name: `brandLogoBlock`,
    title: `Brand Logo Block`,
    type: `object`,
    icon: BiHeart,
    fields: [
        {
            name: `logos`,
            title: `Logos`,
            type: `array`,
            of: [
                {
                    name: `brandLogo`,
                    title: `Logo`,
                    type: `brandLogo`,
                }
            ]
        }
    ]
}