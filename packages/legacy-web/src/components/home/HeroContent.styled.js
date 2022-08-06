import styled from 'styled-components';
import { H1 } from '../typography';

const HeroContent = styled.div`
	height: 100%;
	max-width: 1200px;
	padding: 0 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media (max-width: 850px) {
		${H1} {
			font-size: 3rem;
		}
	}

	@media (max-width: 600px) {
		${H1} {
			font-size: 10vw;
		}
	}
`;

export default HeroContent;
