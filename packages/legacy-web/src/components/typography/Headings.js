import styled from 'styled-components';

const H1 = styled.h1`
	font-family: var(--font-headline);
	font-size: 3rem;
	font-weight: bold;
	line-height: ${(props) => props.lineHeight || `1.3`};
	margin: ${(props) => props.margin || `2rem 0 1rem 0`};
	text-align: ${(props) => props.textAlign || `left`};
	color: ${(props) => props.color || `var(--color-primary-main)`};

	@media (max-width: 768px) {
		font-size: 2.75rem;
	}

	@media (max-width: 500px) {
		font-size: 2.5rem;
	}

	@media (max-width: 425px) {
		font-size: 2rem;
	}
`;

const H2 = styled.h2`
	font-family: var(--font-headline);
	font-size: 2.5rem;
	font-weight: bold;
	line-height: ${(props) => props.lineHeight || `1.3`};
	margin: ${(props) => props.margin || `2rem 0 1rem 0`};
	text-align: ${(props) => props.textAlign || `left`};
	color: ${(props) => props.color || `var(--color-primary-main)`};
`;

const H3 = styled.h3`
	font-family: var(--font-headline);
	font-size: 2rem;
	font-weight: bold;
	line-height: ${(props) => props.lineHeight || `1.3`};
	margin: ${(props) => props.margin || `2rem 0 1rem 0`};
	text-align: ${(props) => props.textAlign || `left`};
	color: ${(props) => props.color || `var(--color-primary-main)`};
`;

const H4 = styled.h4`
	font-family: var(--font-headline);
	font-size: 1.5rem;
	font-weight: bold;
	line-height: ${(props) => props.lineHeight || `1.3`};
	margin: ${(props) => props.margin || `2rem 0 1rem 0`};
	text-align: ${(props) => props.textAlign || `left`};
	color: ${(props) => props.color || `var(--color-primary-main)`};
`;

const H5 = styled.h5`
	font-family: var(--font-headline);
	font-size: 1.25rem;
	font-weight: bold;
	line-height: ${(props) => props.lineHeight || `1.3`};
	margin: ${(props) => props.margin || `2rem 0 1rem 0`};
	text-align: ${(props) => props.textAlign || `left`};
	color: ${(props) => props.color || `var(--color-primary-main)`};
`;

const H6 = styled.h6`
	font-family: var(--font-headline);
	font-size: 1rem;
	font-weight: bold;
	line-height: ${(props) => props.lineHeight || `1.3`};
	margin: ${(props) => props.margin || `2rem 0 1rem 0`};
	text-align: ${(props) => props.textAlign || `left`};
	color: ${(props) => props.color || `var(--color-primary-main)`};
`;

const Mega = styled(H1)`
	font-size: 9.375rem;
	line-height: 1;

	@media (max-width: 850px) {
		font-size: 20vw;
	}
`;

export { H1, H2, H3, H4, H5, H6, Mega };
