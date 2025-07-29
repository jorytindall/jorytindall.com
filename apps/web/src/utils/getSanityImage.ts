import { getImageAsset, buildImageUrl } from '@sanity/asset-utils';
import { sanityClient } from 'lib/sanity/config';

export function getSanityImageUrl(imageRef) {
	if (!imageRef) return null;

	// @ts-ignore
	const image = getImageAsset(imageRef, sanityClient.config());
	const getUrl = buildImageUrl(image, sanityClient.config());

	return getUrl;
}
