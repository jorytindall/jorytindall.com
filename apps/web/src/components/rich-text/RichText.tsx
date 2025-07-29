import { sanityConfig } from 'lib/sanity/config';
import { PortableText } from '@portabletext/react';
import { Components } from './Components';

export const RichText = ({ value }) => {
	return (
		<PortableText value={value} components={Components} {...sanityConfig} />
	)
}
