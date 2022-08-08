import { createClient } from 'next-sanity'
import { config } from './sanityConfig'

export const sanityClient = createClient(config)
export const previewClient = createClient({
    ...client,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})

export const getClient = (usePreview) => (usePreview ? previewClient : sanityClient)