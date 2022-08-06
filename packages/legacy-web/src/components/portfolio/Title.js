import React from 'react';
import styled from 'styled-components';
import { H1, H6, Paragraph } from '../typography';
import { TextArrow } from '../button';
import { Badge } from '../badge';

const Title = ({
	title = 'This is the page title',
	client = 'Client name',
	projectTypes = 'Design',
	roles = 'Design Lead',
	tools = ['Figma', 'React'],
	timeline = 'August, 1969',
	overview = 'This is an overview of the project. It went great!',
	link = 'https://jorytindall.com',
}) => {
	// const mapTypes = projectTypes.map(type => type + ' ')
	const mapTypes = projectTypes.map((type) => (
		<Badge text={type} key={type} />
	));
	const mapTools = tools.map((tool) => <Badge text={tool} key={tool} />);
	const mapRoles = roles.map((role) => <Badge text={role} key={role} />);

	return (
		<Wrapper>
			<Content>
				<TitleWrapper>
					<H6 color="var(--color-primary-shade)" margin="0 0 1rem 0">
						{client}
					</H6>
					<H1 margin="0">{title}</H1>
				</TitleWrapper>
				<Details>
					<DetailItem>
						<H6 color="var(--color-primary-shade)">Type</H6>
						<FlexContainer>{mapTypes}</FlexContainer>
						{/* <Paragraph>{mapTypes}</Paragraph> */}
					</DetailItem>
					<DetailItem>
						<H6 color="var(--color-primary-shade)">Role</H6>
						<FlexContainer>{mapRoles}</FlexContainer>
					</DetailItem>
					<DetailItem>
						<H6 color="var(--color-primary-shade)">Tools</H6>
						<FlexContainer>{mapTools}</FlexContainer>
					</DetailItem>
					<DetailItem>
						<H6 color="var(--color-primary-shade)">Timeline</H6>
						<FlexContainer>
							<Badge text={timeline} />
						</FlexContainer>
					</DetailItem>
				</Details>
				<Overview>
					<Paragraph lead>{overview}</Paragraph>
				</Overview>
				<TextArrow link={link} text="See it live" />
			</Content>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	background: var(--color-accent-01);
	padding: 4.444rem 1rem;
	display: flex;
	justify-content: center;

	@media (max-width: 1000px) {
		padding: 2rem 1rem;
	}
`;

const Content = styled.div`
	max-width: 1200px;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media (max-width: 1000px) {
		${H1} {
			font-size: 2.75rem;
		}
	}

	@media (max-width: 500px) {
		gap: 1.5rem;
	}
`;

const TitleWrapper = styled.article``;

const Details = styled.article`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	gap: 2.222rem;
	flex-wrap: wrap;
	margin-bottom: 1rem;
`;

const DetailItem = styled.div``;

const Overview = styled.article``;

const FlexContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
`;

export default Title;
