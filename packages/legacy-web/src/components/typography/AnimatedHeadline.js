import styled from 'styled-components';
import { H1 } from './Headings';

const AnimatedHeadline = styled(H1)`
	color: var(--color-primary-main);
	transition: all 0.15s ease;
	-webkit-text-stroke: 2px var(--color-primary-main);
	font-size: 3.75rem;
	line-height: 1.2;

	&:hover {
		color: transparent;
		transform: translateX(4px);
	}
`;

export default AnimatedHeadline;
