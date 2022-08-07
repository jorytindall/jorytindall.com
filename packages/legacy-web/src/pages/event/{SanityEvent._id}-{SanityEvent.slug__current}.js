import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { formatDateTime } from '../../utils/datetimeFormat';
import { Layout } from '../../components/layout';
import { H1, Paragraph } from '../../components/typography';
import { Container } from '../../components/layout';
import { RichText } from '../../components/richText';
import { TextArrow } from '../../components/button';

const Event = ({ data }) => {
	const { title, image, date, description, url } = data.event;
	return (
		<Layout seo={data.event}>
			<Container>
				{image && <GatsbyImage image={image.asset.gatsbyImageData} />}
				{title && <H1>{title}</H1>}
				{date && <Paragraph>{formatDateTime(date)}</Paragraph>}
				{description && <RichText value={description} />}
				{url && <TextArrow text="More information" link={url} />}
			</Container>
		</Layout>
	);
};

export default Event;

export const query = graphql`
	query EventQuery($id: String!) {
		event: sanityEvent(id: { eq: $id }) {
			_id
			slug {
				current
			}
			title
			id
			date
			location
			url
			description {
				... on SanityRichText {
					_key
					_type
					_rawContent(resolveReferences: { maxDepth: 5 })
				}
			}
			image {
				alternativeText
				asset {
					gatsbyImageData(
						placeholder: BLURRED
						fit: FILL
						width: 1000
						height: 500
					)
				}
			}
		}
	}
`;
