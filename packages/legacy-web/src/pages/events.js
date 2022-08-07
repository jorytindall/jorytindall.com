import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { Layout } from '../components/layout';
import { EventItem } from '../components/event';
import { PageTitle } from '../components/pageTitle';

const Events = () => {
	const getEvents = useStaticQuery(
		graphql`
			query {
				allSanityEvent(sort: { fields: date, order: DESC }) {
					edges {
						node {
							_key
							_id
							title
							location
							date
							slug {
								current
							}
						}
					}
				}
			}
		`
	);

	const events = getEvents.allSanityEvent.edges;

	return (
		<Layout>
			<PageTitle title="🗓 Events" megaTitle="Upcoming Events" />
			<EventWrapper>
				{events.map((event) => {
					return (
						<EventItem input={event.node} key={event.node._id} />
					);
				})}
			</EventWrapper>
		</Layout>
	);
};

export default Events;

const EventWrapper = styled.section`
	width: 100ch;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;
