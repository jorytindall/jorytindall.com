import React from 'react';
import styled from 'styled-components';

export default function Button({ text, link }) {
	return (
		<Wrapper href={link} as="button">
			{text}
		</Wrapper>
	);
}

const Wrapper = styled.a`
	padding: 16px 24px;
	color: ${(props) => props.color || `var(--color-accent-01)`};
	background: ${(props) => props.background || `var(--color-primary-main)`};
	font-family: var(--font-headline);
	font-size: 1rem;
	font-weight: 400;
	line-height: 1rem;
`;
