'use client';

import styles from './Layout.module.css';
import { motion } from 'framer-motion';

interface LayoutProps {
	children: React.ReactNode;
}

const transitionVariants = {
	hidden: { opacity: 0, x: 0, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 0, y: -50 },
};

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={styles.layout}>
			<motion.main
				variants={transitionVariants}
				initial="hidden"
				animate="enter"
				exit="exit"
				transition={{
					ease: 'linear',
				}}
			>
				{children}
			</motion.main>
		</div>
	);
};
