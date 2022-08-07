import React from 'react';
import styled from 'styled-components';
import { Arrow } from '../icon';

const TextArrow = ({ type, text, link }) => {
	return (
		<StyledLink href={link}>
			<span>
				{text}
				<Arrow fill="var(--color-primary-main" direction="right" />
			</span>
		</StyledLink>
	);
};

export default TextArrow;

const StyledLink = styled.a`
	color: var(--color-primary-main);
	display: block;
	text-decoration: none;

	span {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;

		svg {
			transition: all 0.15s ease-in-out;
			position: relative;
			left: 0;
		}
	}

	&:hover {
		span svg {
			left: 0.5rem;
		}
	}
`;
