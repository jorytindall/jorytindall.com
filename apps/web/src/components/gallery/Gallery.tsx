'use client'

import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { getClasses } from 'utils/getClasses';
import { GalleryItem } from './GalleryItem';
import styles from './Gallery.module.css';

interface GalleryProps {
	input: {
		images: any[];
		columns: string;
		_key: string;
	};
}

export const Gallery = ({ input }: GalleryProps) => {
	const classes = getClasses([
		styles.wrapper,
		styles['columns-' + input.columns],
	]);

	const { _key, images } = input;

	const galleryImages = images.map((image) => {
		return (
			<GalleryItem
				key={image._key}
				image={image}
				altText={image.alternativeText}
				caption={image.caption}
			/>
		);
	});

	return (
		<LightGallery
			speed={500}
			elementClassNames={classes}
			plugins={[lgThumbnail, lgZoom]}
			key={_key}
		>
			{galleryImages}
		</LightGallery>
	);
};
