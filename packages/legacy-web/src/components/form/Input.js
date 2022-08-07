import React from 'react';
import styled from 'styled-components';
import Label from './Label';

export default function Input({ label, placeholder, type }) {
	return (
		<Wrapper>
			<Label>{label}</Label>
			<StyledInput name={type} placeholder={placeholder} />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
`;

const StyledInput = styled.input`
	padding: 1rem 1.5rem;
	font-size: 1rem;
	background: var(--color-tertiary-main);
	border: none;
	color: var(--color-dark-main);
	font-family: var(--font-body);
	border-radius: 0;
	transition: all 0.15s ease;

	&:focus {
		outline: none;
		box-shadow: 4px 4px 8px rgba(0, 47, 128, 0.05);
		transform: translateY(-2px);
		background: var(--color-accent-01);

		&::placeholder {
			color: var(--color-accent-04);
		}
	}

	&::placeholder {
		color: var(--color-tertiary-dark-shade);
	}
`;
