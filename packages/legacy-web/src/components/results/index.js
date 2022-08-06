import React from 'react';
import styled from 'styled-components';

import { H5 } from '../typography';
import { ResultsItem } from './ResultsItem';

export const Results = ({ input }) => {
	const { description, resultItems } = input;

	return (
		<Wrapper>
			{description && (
				<H5 as="p" color="var(--color-accent-01)">
					{description}
				</H5>
			)}
			{resultItems && (
				<div>
					{resultItems.map((item) => {
						return (
							<ResultsItem
								key={item._key}
								headline={item.headline}
								description={item.description}
								metric={item.metric}
								percentageDirection={item.percentageDirection}
							/>
						);
					})}
				</div>
			)}
		</Wrapper>
	);
};

const Wrapper = styled.section`
	padding: 2.5rem;
	background: var(--color-primary-main);
	width: 100vw;
	display: flex;
	flex-direction: column;
	gap: 2rem;

	${H5} {
		max-width: 50vw;

		@media (max-width: 1000px) {
			max-width: 100vw;
		}
	}

	div {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		justify-content: center;
		gap: 2rem;
	}

	@media (max-width: 1000px) {
		padding: 2.5rem 1rem;
	}
`;
