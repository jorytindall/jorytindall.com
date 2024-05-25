import { motion } from 'framer-motion';
import styles from 'styles/components/navigation/Header.module.scss';
import { NavItem } from './NavItem';

interface OverlayProps {
	overlay?: any;
}

const overlayAnimation = {
	hidden: {
		opacity: 0,
		transition: { duration: 0.2 },
	},
	enter: { opacity: 1, transition: { duration: 0.2 } },
};

const staggerItems = {
	hidden: {
		opacity: 0,
	},
	enter: {
		opacity: 1,
		transition: {
			staggerChildren: 0.025,
		}
	}
}

export const Overlay = ({ overlay }: OverlayProps) => {
	const getOverlayClass = overlay
		? styles.overlayVisible
		: styles.overlayHidden;

	// Define an array of links to map through
	const links = [
		{
			slug: '/',
			text: 'Home',
		},
		{
			slug: '/about',
			text: 'About',
		},
		{
			slug: '/portfolio',
			text: 'Portfolio',
		},
		{
			slug: '/music',
			text: 'Music',
		},
		{
			slug: '/events',
			text: 'Events',
		},
		{
			slug: '/talks',
			text: 'Speaking',
		},
		{
			slug: '/blog',
			text: 'Blog',
		},
		{
			slug: '/contact',
			text: 'Contact',
		},
	];

	return (
		<motion.div
			variants={overlayAnimation}
			initial="hidden"
			animate={overlay ? "enter" : "hidden"}
			className={getOverlayClass}
		>
			<motion.ul
				variants={staggerItems}
				initial="hidden"
				animate={overlay ? "enter" : "hidden"}
				className={styles.linkWrapper}
			>
				{links.map((link) => (
					<NavItem key={link.text} slug={link.slug} text={link.text} />
				))}
			</motion.ul>
		</motion.div>
	);
};
