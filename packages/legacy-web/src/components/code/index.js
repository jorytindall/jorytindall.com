import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { Paragraph } from '../typography';

export const CodeBlock = ({ input }) => {
	const { code, description, language } = input;

	return (
		<Wrapper>
			<Highlight
				{...defaultProps}
				code={code.code}
				language="js"
				theme={theme}
			>
				{({
					className,
					style,
					tokens,
					getLineProps,
					getTokenProps,
				}) => (
					<div className="gatsby-highlight" data-language={language}>
						<pre className={className} style={style}>
							{tokens.map((line, i) => (
								<div {...getLineProps({ line, key: i })}>
									{line.map((token, key) => (
										<span
											{...getTokenProps({ token, key })}
										/>
									))}
								</div>
							))}
						</pre>
					</div>
				)}
			</Highlight>
			{description && (
				<Paragraph
					secondary
					margin="0.25rem 0"
					color="var(--color-accent-05)"
				>
					{description}
				</Paragraph>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	margin: 2.5rem 0;

	.gatsby-highlight {
		position: relative;
		-webkit-overflow-scrolling: touch;
	}
	.gatsby-highlight pre[class*='language-'] {
		-webkit-overflow-scrolling: touch;
		padding: 1rem 0.75rem;
		overflow: scroll;
	}
	.gatsby-highlight pre[class*='language-']::before {
		background: black;
		color: white;
		font-size: 12px;
		letter-spacing: 0.025rem;
		padding: 0.1rem 0.5rem;
		position: absolute;
		right: 1rem;
		text-align: right;
		text-transform: uppercase;
		top: 0;
	}
	.gatsby-highlight pre[class~='language-javascript']::before {
		content: 'js';
		background: #f7df1e;
		color: black;
	}
	.gatsby-highlight pre[class~='language-js']::before {
		content: 'js';
		background: #f7df1e;
		color: black;
	}

	.gatsby-highlight pre[class~='language-html']::before {
		content: 'html';
		background: #005a9c;
		color: white;
	}

	.gatsby-highlight pre[class~='language-css']::before {
		content: 'css';
		background: #ff9800;
		color: white;
	}
`;
