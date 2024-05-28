import { config } from 'lib/sanityConfig';
import { PortableText } from '@portabletext/react';
import { Components } from './Components';

export const RichText = ({ value }) => (
	<PortableText value={value} components={Components} {...config} />
);
