import { getFileAsset } from '@sanity/asset-utils';
import { sanityClient } from 'lib/sanity/config';

export function getSanityFileUrl(assetRef) {
	if (!assetRef) return null;

	const fileUrl = getFileAsset(assetRef, sanityClient.config());
	return fileUrl;
}
