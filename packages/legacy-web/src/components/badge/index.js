import React from 'react';
import styled from 'styled-components';

export const Badge = ({ text = 'Badge', type }) => {
	return <Wrapper type={type}>{text}</Wrapper>;
};

const Wrapper = styled.span`
	padding: 4px 16px;
	font-family: var(--font-headline);
	font-size: 1rem;
	line-height: 1.7;
	font-weight: 600;
	border-radius: 4px;
	letter-spacing: 0.25px;

	${(props) =>
		props.type === 'primary'
			? `
        background: var(--color-secondary-light-tint);
        color: var(--color-secondary-dark-shade);
    `
			: props.type === 'secondary'
			? `
        background: var(--color-tertiary-medium-tint);
        color: var(--color-tertiary-dark-shade);
    `
			: `
        background: var(--color-secondary-light-tint);
        color: var(--color-secondary-dark-shade);
    `}
`;
