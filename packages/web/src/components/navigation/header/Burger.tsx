import { motion } from 'framer-motion';
import { getClasses } from 'utils/getClasses';
import styles from 'styles/components/navigation/Header.module.scss';

interface BurgerProps {
	overlay: any;
	toggle: any;
}

export const Burger = ({ overlay, toggle }: BurgerProps) => {
	const classes = getClasses([
		styles.burger,
		overlay === true ? styles.burgerOverlay : null,
	]);

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
		<div className={classes} onClick={() => toggle(!overlay)}>
			<motion.div
				animate={overlay ? 'open' : 'closed'}
				variants={topVariants}
				transition={transition}
				className={styles.bar}
			/>
			<motion.div
				animate={overlay ? 'open' : 'closed'}
				variants={bottomVariants}
				transition={transition}
				className={styles.bar}
			/>
		</div>
	);
};
