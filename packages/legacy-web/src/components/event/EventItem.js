import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { H4, Paragraph } from '../typography';
import { formatDateTime } from '../../utils/datetimeFormat';

export default function EventItem({ input }) {
	const { title, date, _id, location, slug } = input;
	return (
		<Wrapper to={`/event/${_id}-${slug.current}`}>
			{title && <H4 margin="0">{title}</H4>}
			{date && <Paragraph margin="0">{formatDateTime(date)}</Paragraph>}
			{location && <Paragraph margin="0">{location}</Paragraph>}
		</Wrapper>
	);
}

const Wrapper = styled(Link)`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	background: var(--color-tertiary-medium-tint);
	padding: 2rem;
	text-decoration: none;
	transition: all 0.1s ease-in-out;

	&:hover {
		background: var(--color-primary-main);
		transform: translateY(-4px);

		& > * {
			color: var(--color-accent-01);
		}
	}
`;
