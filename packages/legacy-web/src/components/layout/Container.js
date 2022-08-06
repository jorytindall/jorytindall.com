import React from 'react';
import styled from 'styled-components';

export default function Container({ children }) {
	return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
	padding: 2rem 1rem;
	display: grid;
	grid-template-columns: 1fr min(75ch, 100%) 1fr;

	> * {
		grid-column: 2;
	}
`;
