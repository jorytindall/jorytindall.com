import React from 'react';
import styled from 'styled-components';

import { H1, H6, Paragraph } from '../typography';

export const ResultsItem = ({
	headline = 'Title',
	description = 'Description',
	metric = '50',
	percentageDirection = 'up',
}) => {
	return (
		<Wrapper>
			{metric && (
				<Percentage>
					<H1 color="var(--color-success-main)" margin="0">
						{metric}
					</H1>
					{percentageDirection && (
						<Arrow
							direction={percentageDirection}
							width="30"
							height="31"
							viewBox="0 0 30 31"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M15.375 0.5L30 30.5H0L15.375 0.5Z"
								fill="#00D3A1"
							/>
						</Arrow>
					)}
				</Percentage>
			)}
			{headline && (
				<H6 color="var(--color-accent-01)" margin="0">
					{headline}
				</H6>
			)}
			{description && (
				<Paragraph
					secondary
					color="var(--color-primary-light-tint)"
					margin="0"
				>
					{description}
				</Paragraph>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.article`
	background: var(--color-primary-shade);
	padding: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 0.5rem;
`;

const Percentage = styled.span`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	color: var(--color-success-main);
	font-size: 4.166rem;
	line-height: 1.3;
	font-weight: bold;
`;

const Arrow = styled.svg`
	${(props) =>
		props.direction === 'down'
			? `transform: rotateZ(180deg);`
			: `transform: rotateZ(0deg);`};
`;
