import React from 'react';
import { Paragraph } from '../typography';
import ResolvedLink from '../richText/ResolvedLink';

export const Serializers = {
	types: {
		block: ({ node, children }) => {
			switch (node.style) {
				case `normal`:
					return (
						<Paragraph secondary margin="0" textAlign="center">
							{children}
						</Paragraph>
					);
				default:
					return (
						<Paragraph secondary margin="0" textAlign="center">
							{children}
						</Paragraph>
					);
			}
		},
	},
	marks: {
		internalLink: ({ mark, children }) => {
			return <ResolvedLink data={mark}>{children}</ResolvedLink>;
		},
	},
};
