import React from 'react';
import styled from 'styled-components';

export default function Arrow({ fill, direction, margin }) {
	return (
		<Wrapper
			direction={direction}
			margin={margin}
			width="40"
			height="40"
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M19 26.3427V8H21V26.3427C22.65 24.3037 25.1727 23 28 23V25C24.134 25 21 28.134 21 32H19C19 28.134 15.866 25 12 25V23C14.8273 23 17.35 24.3037 19 26.3427Z"
				fill={fill || `var(--color-dark-main)`}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.svg`
	transform: ${(props) => {
		switch (props.direction) {
			case `bottom`:
				return `rotate(0)`;
			case `right`:
				return `rotate(-0.25turn)`;
			case `left`:
				return `rotate(0.25turn)`;
			case `top`:
				return `rotate(0.5turn)`;
			default:
				return `rotate(0)`;
		}
	}};
	margin: ${(props) => props.margin || `margin: 0`};
`;
