import styled from 'styled-components';

const MainContent = styled.section`
	width: 100vw;
	background: var(--color-tertiary-light-tint);
	padding: 2.5rem 1rem;
	display: grid;
	grid-template-columns: 1fr min(75ch, 100%) 1fr;

	& > * {
		grid-column: 2;
	}
`;

export default MainContent;
