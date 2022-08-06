import React from 'react';
import { H1, H2, H3, H4, H5, H6, Paragraph, Code } from '../typography';
import ResolvedLink from './ResolvedLink';
import { Blockquote } from '../blockquote';
import { CodeBlock } from '../code';
import { InlineImage } from '../image/InlineImage';

const Components = {
	block: {
		h1: ({ children }) => <H1>{children}</H1>,
		h2: ({ children }) => <H2>{children}</H2>,
		h3: ({ children }) => <H3>{children}</H3>,
		h4: ({ children }) => <H4>{children}</H4>,
		h5: ({ children }) => <H5>{children}</H5>,
		h6: ({ children }) => <H6>{children}</H6>,
		normal: ({ children }) => <Paragraph primary>{children}</Paragraph>,
		blockquote: ({ children }) => <Blockquote text={children} />,
	},
	marks: {
		internalLink: ({ value, children }) => {
			return <ResolvedLink data={value}>{children}</ResolvedLink>;
		},
		code: ({ value, children }) => {
			return <Code data={value}>{children}</Code>;
		},
	},
	types: {
		codeBlock: ({ value }) => {
			return <CodeBlock input={value} key={value._key} />;
		},
		mainImage: ({ value }) => {
			return <InlineImage input={value} key={value._key} />;
		},
		fileDownload: ({ value }) => {
			console.log(value);
			return <p>Download text here</p>;
		},
	},
};

export default Components;
