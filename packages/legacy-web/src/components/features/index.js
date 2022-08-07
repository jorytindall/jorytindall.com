import React from 'react';
import styled from 'styled-components';
import { SRLWrapper } from 'simple-react-lightbox';
import { GatsbyImage } from 'gatsby-plugin-image';
import { H5, Paragraph } from '../typography';

export const Features = ({ input }) => {
	const options = {
		settings: {
			overlayColor: 'rgba(22, 15, 41, 0.75)',
		},
		caption: {},
		buttons: {},
		thumbnails: {},
		progressBar: {},
	};

	const { featureItems, columns, _key } = input;

	return (
		<SRLWrapper options={options} key={_key}>
			<Wrapper columns={columns}>
				{featureItems.map((item) => {
					return (
						<div key={item._key}>
							<StyledGatsbyImage
								image={item.image.asset.gatsbyImageData}
								alt={item.image.alternativeText}
							/>
							<H5 color="var(--color-accent-01)" margin="1rem 0">
								{item.title}
							</H5>
							<Paragraph
								color="var(--color-accent-01)"
								margin="1rem 0"
							>
								{item.description}
							</Paragraph>
						</div>
					);
				})}
			</Wrapper>
		</SRLWrapper>
	);
};

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: repeat(${(props) => props.columns}, 1fr);
	padding: 5rem;
	gap: 5rem;
	background: var(--color-primary-shade);

	@media (max-width: 1000px) {
		grid-template-columns: 1fr;
		padding: 2.5rem 1rem;
		gap: 2.5rem;
	}
`;

const StyledGatsbyImage = styled(GatsbyImage)`
	box-shadow: 0.25rem 0.5rem 2.5rem rgba(0, 0, 0, 0.05);
	transition: all 250ms cubic-bezier(0.77, 0, 0.175, 1);
	cursor: url('/emojis/the-horns.png'), pointer;

	&:hover {
		box-shadow: 0.35rem 0.65rem 2.5rem rgba(0, 0, 0, 0.1);
		transform: translateY(-0.5rem) rotateZ(1deg);
	}
`;
