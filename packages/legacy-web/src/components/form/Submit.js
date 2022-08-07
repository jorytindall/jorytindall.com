import React from 'react';
import styled from 'styled-components';

export default function Submit({ text }) {
	return <StyledButton>{text}</StyledButton>;
}

const StyledButton = styled.button`
	padding: 16px 24px;
	color: ${(props) => props.color || `var(--color-accent-01)`};
	background: ${(props) => props.background || `var(--color-primary-main)`};
	font-family: var(--font-headline);
	border: none;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1rem;
	margin: 2rem 0;
	transition: all 0.15s ease;

	&:hover {
		background: var(--color-primary-shade);
		cursor: pointer;
		transform: translateY(-2px);
		box-shadow: 4px 4px 8px rgba(0, 47, 128, 0.05);
	}
`;
