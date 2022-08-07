import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Burger = ({ overlay, toggle }) => {
	const topVariants = {
		open: { rotate: 45, y: 7 },
		closed: { rotate: 0 },
	};

	const bottomVariants = {
		open: { rotate: -45, y: -7 },
		closed: { rotate: 0 },
	};

	const transition = {
		duration: 0.25,
		ease: 'backInOut',
	};

	return (
		<Wrapper overlay={overlay} onClick={() => toggle(!overlay)}>
			<Bar
				top
				overlay={overlay}
				animate={overlay ? 'open' : 'closed'}
				variants={topVariants}
				transition={transition}
			/>
			<Bar
				bottom
				overlay={overlay}
				animate={overlay ? 'open' : 'closed'}
				variants={bottomVariants}
				transition={transition}
			/>
		</Wrapper>
	);
};

export default Burger;

const Wrapper = styled.div`
	cursor: pointer;
	padding: 0.5rem 0.75rem;
	background: var(--color-accent-01);
	box-shadow: 0px 0px 12px rgba(22, 15, 41, 0.05);

	${(props) =>
		props.overlay &&
		`
        box-shadow: none;
    `}
`;

const Bar = styled(motion.div)`
	width: 32px;
	height: 2px;
	background: var(--color-primary-main);
	margin: 12px 0;
`;
