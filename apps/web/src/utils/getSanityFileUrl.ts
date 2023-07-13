import { getFileAsset } from '@sanity/asset-utils'
import { sanityConfig } from 'lib/sanity.client'

export function getSanityFileUrl(assetRef) {
  if (!assetRef) return null

  const fileUrl = getFileAsset(assetRef, sanityConfig)
  return fileUrl
}