import React from 'react';
import clientConfig from '../../../clientConfig';
import BaserichText from '@sanity/block-content-to-react';
import { Serializers } from './Serializers';

export function Content({ blocks }) {
	return (
		<BaserichText
			blocks={blocks}
			serializers={Serializers}
			{...clientConfig}
		/>
	);
}
