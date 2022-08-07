import React from 'react';
import styled from 'styled-components';
import { Mega, Paragraph } from '../typography';
import { Arrow } from '../icon';

export function PageTitle({ title, megaTitle }) {
	return (
		<Wrapper>
			{title && (
				<Paragraph lead>
					{title} <Arrow direction="right" margin="0 0 0 1rem" />
				</Paragraph>
			)}
			{megaTitle && <Mega>{megaTitle}</Mega>}
		</Wrapper>
	);
}

const Wrapper = styled.section`
	padding: 2rem;
	display: grid;
	grid-template-columns: repeat(1fr, 3);
	grid-template-areas: 'title mega mega';

	${Paragraph} {
		grid-area: title;
		display: flex;
		flex-direction: row;
	}

	${Mega} {
		grid-area: mega;
		max-width: 8ch;
	}

	@media (max-width: 1000px) {
		display: flex;
		flex-direction: column;

		${Mega} {
			max-width: 100%;
		}
	}

	@media (max-width: 758px) {
		padding: 1rem;
	}
`;
