	import React from 'react';
import styled from 'styled-components';

export const Blockquote = ({ text }) => {
	return (
		<Wrapper>
			<StyledBlockquote>"{text}"</StyledBlockquote>
		</Wrapper>
	);
};

const Wrapper = styled.article`
	background: var(--color-accent-01);
	padding: 2.5rem;
	margin: 2.5rem 0 0 0;
`;

const StyledBlockquote = styled.blockquote`
	font-family: var(--font-body);
	font-size: 1.25rem;
	line-height: 1.7;
	color: var(--color-primary-shade);
`;
