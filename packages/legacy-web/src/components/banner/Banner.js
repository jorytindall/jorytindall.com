import React from 'react';
import styled from 'styled-components';
import { Content } from './Content';

export function Banner({ content = 'This is the content' }) {
	return (
		<Wrapper>
			<Content blocks={content} />
		</Wrapper>
	);
}

const Wrapper = styled.aside`
	max-width: 100vw;
	text-align: center;
	background: var(--color-secondary-main);
	padding: 0.25rem 1rem;
	color: var(--color-dark-main);
	box-sizing: border-box;
`;
