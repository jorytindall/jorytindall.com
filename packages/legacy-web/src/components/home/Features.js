import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Paragraph } from '../typography';

export default function Features() {
	return (
		<Wrapper>
			<Content>
				<Portfolio to="/portfolio">
					<Paragraph
						padding="0"
						margin="0"
						color="var(--color-accent-01)"
					>
						<strong>Selected Works</strong>
					</Paragraph>
					<Paragraph
						padding="0"
						margin="0"
						color="var(--color-accent-01)"
						secondary
					>
						Portfolio
					</Paragraph>
				</Portfolio>
				<Music to="/music">
					<Paragraph
						padding="0"
						margin="0"
						color="var(--color-accent-01)"
					>
						<strong>Music Projects</strong>
					</Paragraph>
					<Paragraph
						padding="0"
						margin="0"
						color="var(--color-accent-01)"
						secondary
					>
						Collaborations in Sound
					</Paragraph>
				</Music>
				<DownbeatAcademy as="a" href="https://downbeatacademy.com">
					<Paragraph
						padding="0"
						margin="0"
						color="var(--color-accent-01)"
					>
						<strong>Downbeat Academy</strong>
					</Paragraph>
					<Paragraph
						padding="0"
						margin="0"
						color="var(--color-accent-01)"
						secondary
					>
						Democratizing music education for students, educators,
						and musicians.
					</Paragraph>
				</DownbeatAcademy>
				<Teaching to="/teaching">
					<Paragraph
						padding="0"
						margin="0"
						color="var(--color-accent-01)"
					>
						<strong>Teaching</strong>
					</Paragraph>
					<Paragraph
						padding="0"
						margin="0"
						color="var(--color-accent-01)"
						secondary
					>
						Education and private instruction
					</Paragraph>
				</Teaching>
			</Content>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	background: var(--color-accent-01);
	padding: 2.5rem 0;
	display: grid;
	grid-template-columns: 1fr min(1170px, 100%) 1fr;
`;

const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(3, 175px);
	grid-column: 2;
	grid-gap: 2.5rem;

	@media (max-width: 950px) {
		grid-template-columns: 100%;
		grid-template-rows: repeat(4, 150px);
	}
`;

const Portfolio = styled(Link)`
	grid-column: 1 / span 2;
	grid-row: 1 / span 3;
	background: var(--color-primary-main);
	color: var(--color-accent-01);
	text-decoration: none;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	@media (max-width: 950px) {
		grid-column: 1;
		grid-row: span 1;
	}
`;

const Music = styled(Link)`
	grid-row: span 1;
	background: var(--color-primary-main);
	color: var(--color-accent-01);
	text-decoration: none;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	@media (max-width: 950px) {
		grid-column: 1;
		grid-row: span 1;
	}
`;

const DownbeatAcademy = styled(Link)`
	grid-row: span 1;
	background: var(--color-primary-main);
	color: var(--color-accent-01);
	text-decoration: none;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	@media (max-width: 950px) {
		grid-column: 1;
		grid-row: span 1;
	}
`;

const Teaching = styled(Link)`
	grid-row: span 1;
	background: var(--color-primary-main);
	color: var(--color-accent-01);
	text-decoration: none;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;

	@media (max-width: 950px) {
		grid-column: 1;
		grid-row: span 1;
	}
`;
