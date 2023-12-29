import { getFileAsset } from '@sanity/asset-utils'
import { sanityClient } from 'lib/sanity/sanityClient'

export function getSanityFileUrl(assetRef) {
  if (!assetRef) return null

  const fileUrl = getFileAsset(assetRef, sanityClient.config())
  return fileUrl
}