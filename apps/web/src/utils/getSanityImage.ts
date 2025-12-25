import { getImageAsset, buildImageUrl } from '@sanity/asset-utils';
import { sanityClient } from 'lib/sanity/config';

export function getSanityImageUrl(imageRef) {
	if (!imageRef || !imageRef.asset) return null;

	try {
		// @ts-ignore
		const image = getImageAsset(imageRef, sanityClient.config());
		const getUrl = buildImageUrl(image, sanityClient.config());
		return getUrl;
	} catch (error) {
		console.error('Failed to resolve Sanity image:', error);
		return null;
	}
}
