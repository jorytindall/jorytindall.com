import { graphql } from 'gatsby';

export const moduleContentQuery = graphql`
	fragment RichText on SanityRichText {
		_key
		_type
		_rawContent(resolveReferences: { maxDepth: 5 })
	}

	fragment PortfolioList on SanityPortfolioList {
		_key
		_type
		items {
			item {
				_key
				title
				client
				slug {
					current
				}
				featuredImage {
					alternativeText
					asset {
						gatsbyImageData(
							layout: CONSTRAINED
							placeholder: BLURRED
							fit: FILL
						)
					}
				}
			}
		}
	}

	fragment Form on SanityForm {
		_key
		_type
		method
		netlify
		title
		fields {
			... on SanityInput {
				_key
				_type
				label
				placeholder
				type
			}
			... on SanitySubmit {
				_key
				_type
				text
			}
			... on SanityTextarea {
				_key
				_type
				label
				name
				placeholder
			}
		}
		action {
			_type
			slug {
				current
			}
		}
	}

	fragment Gallery on SanityGallery {
		_key
		_type
		columns
		images {
			_key
			caption
			alternativeText
			asset {
				_key
				gatsbyImageData(width: 2000, placeholder: BLURRED, fit: FILLMAX)
			}
		}
	}
`;
