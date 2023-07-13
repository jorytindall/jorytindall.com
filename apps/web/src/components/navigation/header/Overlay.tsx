import Link from 'next/link';
import { motion } from 'framer-motion'
import { FeaturedItem } from './FeaturedItem';
import styles from 'styles/components/navigation/Header.module.scss';

interface OverlayProps {
	overlay?: any;
}

const overlayAnimation = {
	hidden: { opacity: 0 },
	enter: { opacity: 1 },
}

const linkAnimation = {
	hidden: { opacity: 0, translateX: 50 },
	enter: { opacity: 1, translateX: 0 },
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
			initial='hidden'
			animate='enter'
			className={getOverlayClass}
		>
			<motion.aside
				initial='hidden'
				animate='enter'
				className={styles.linkWrapper}
			>
				{links.map((link) => {
					return (
						<Link href={link.slug} key={link.text} className={styles.navLink}>
							{link.text}
						</Link>
					);
				})}
			</motion.aside>
		</motion.div>
	);
};
