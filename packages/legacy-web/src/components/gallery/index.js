import React from 'react';
import styled from 'styled-components';
import { SRLWrapper } from 'simple-react-lightbox';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Paragraph } from '../typography';

export function Gallery({ input }) {
	const options = {
		settings: {
			overlayColor: 'rgba(22, 15, 41, 0.75)',
		},
		caption: {},
		buttons: {},
		thumbnails: {},
		progressBar: {},
	};

	const { images, columns } = input;

	return (
		<SRLWrapper options={options} key={input._key}>
			<Wrapper columns={columns}>
				{images.map((image) => {
					return (
						<div key={image._key}>
							<StyledGatsbyImage
								key={image.asset._key}
								image={image.asset.gatsbyImageData}
								alt={image.alternativeText}
							/>
							{image.caption && (
								<Paragraph
									secondary
									margin="0.5rem 0"
									color="var(--color-accent-05)"
								>
									{image.caption}
								</Paragraph>
							)}
						</div>
					);
				})}
			</Wrapper>
		</SRLWrapper>
	);
}

const Wrapper = styled.section`
	display: grid;
	grid-template-columns: repeat(${(props) => props.columns}, 1fr);
	padding: 2.5rem;
	gap: 2.5rem;

	@media (max-width: 1000px) {
		grid-template-columns: 1fr;
		padding: 1rem;
		gap: 1rem;
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
