import { createPreviewSubscriptionHook, createCurrentUserHook } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import { config } from './sanityConfig'

export const urlFor = (source) => createImageUrlBuilder(config).image(source)
export const usePreviewSubscriptionHook = createPreviewSubscriptionHook(config)