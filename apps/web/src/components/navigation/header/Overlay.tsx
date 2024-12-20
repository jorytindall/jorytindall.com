import { motion } from 'framer-motion';
import styles from './Overlay.module.css';
import { NavLinks } from './NavLinks'
import { NavItem } from './NavItem';

interface OverlayProps {
	overlay?: any;
	links: {
		title: string;
		link: string;
		_key: string;
	}[];
}

const overlayAnimation = {
	hidden: {
		opacity: 0,
		transition: { duration: 0.2 },
	},
	enter: { opacity: 1, transition: { duration: 0.2 } },
};

export const Overlay = ({ overlay, links }: OverlayProps) => {
	const getOverlayClass = overlay
		? styles['overlay-visible']
		: styles['overlay-hidden'];

	return (
		<motion.div
			variants={overlayAnimation}
			initial="hidden"
			animate={overlay ? "enter" : "hidden"}
			// @ts-ignore
			className={getOverlayClass}
		>
			<NavLinks overlay={overlay}>
				{links.map((link) => (
					<NavItem key={link._key} slug={link.link} text={link.title} />
				))}
			</NavLinks>
		</motion.div>
	);
};
