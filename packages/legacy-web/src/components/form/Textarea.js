import React from 'react';
import styled from 'styled-components';

import Label from './Label';

export default function Textarea({ label, name, placeholder }) {
	return (
		<Wrapper>
			<Label>{label}</Label>
			<StyledTextarea
				name={name}
				rows="8"
				placeholder={placeholder}
			></StyledTextarea>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const StyledTextarea = styled.textarea`
	padding: 1rem 1.5rem;
	font-family: var(--font-body);
	font-size: 1rem;
	color: var(--color-dark-main);
	border: none;
	background: var(--color-tertiary-main);
	border-radius: 0;
	transition: all 0.25s ease;

	&:focus {
		box-shadow: 4px 4px 8px rgba(0, 47, 128, 0.05);
		transform: translateY(-2px);
		outline: none;
		background: var(--color-accent-01);

		&::placeholder {
			color: var(--color-accent-04);
		}
	}

	&::placeholder {
		color: var(--color-tertiary-dark-shade);
	}
`;
