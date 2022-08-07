import styled from 'styled-components';
import { Link } from 'gatsby';

const Paragraph = styled.p`
	font-family: var(--font-body);
	font-size: ${(props) =>
		props.primary
			? `1.125rem`
			: props.secondary
			? `0.9rem`
			: props.lead
			? `1.375rem`
			: `1.125rem`};
	line-height: ${(props) => props.lineHeight || 1.8};
	color: ${(props) => props.color || `var(--color-dark-main)`};
	margin: ${(props) => props.margin || `1rem 0`};
	text-align: ${(props) => props.textAlign || `left`};

	a {
		color: ${(props) => props.linkColor || `var(--color-primary-main)`};

		&:visited {
			color: ${(props) => props.linkColor || `var(--color-primary-main)`};
		}
	}
`;

const UL = styled.ul`
	li {
		font-family: var(--font-body);
		font-size: ${(props) => props.fontSize || `1.125rem`};
		line-height: ${(props) => props.lineHeight || 1.8};
		color: ${(props) => props.color || `var(--color-dark-main)`};
		margin: ${(props) => props.margin || `1rem 0`};
	}
`;

const OL = styled.ol``;

const InternalLink = styled(Link)`
	color: ${(props) => props.color || `var(--color-primary-main)`};
	text-decoration: ${(props) => props.textDecoration || `none`};
	font-size: inherit;
	font-family: inherit;
	transition: all 0.15s;
	display: ${(props) => props.display || props.inline};
	margin: ${(props) => props.margin || `0`};
	padding: ${(props) => props.padding || `0`};

	&:visited {
		color: ${(props) => props.color || `var(--color-primary-main)`};
	}
	&:focus {
		color: ${(props) => props.hover || `var(--color-primary-mediumTint)`};
	}
	&:hover {
		color: ${(props) => props.hover || `var(--color-primary-mediumTint)`};
	}
	&:active {
		color: ${(props) => props.active || `var(--color-primary-shade)`};
	}
`;

const ExternalLink = styled.a`
	color: ${(props) => props.color || `var(--color-primary-main)`};
	text-decoration: ${(props) => props.textDecoration || `none`};
	font-size: inherit;
	font-family: inherit;
	transition: all 0.15s;
	margin: ${(props) => props.margin || `0`};
	padding: ${(props) => props.padding || `0`};

	&:visited {
		color: ${(props) => props.color || `var(--color-primary-main)`};
	}
	&:focus {
		color: ${(props) => props.hover || `var(--color-primary-mediumTint)`};
	}
	&:hover {
		color: ${(props) => props.hover || `var(--color-primary-mediumTint)`};
	}
	&:active {
		color: ${(props) => props.active || `var(--color-primary-shade)`};
	}
`;

const Code = styled.code`
	background: var(--color-tertiary-main);
	color: var(--color-tertiary-shade);
	padding: 0.25rem 0.5rem;
	font-family: var(--font-monospace);
`;

export { Paragraph, UL, OL, InternalLink, ExternalLink, Code };
