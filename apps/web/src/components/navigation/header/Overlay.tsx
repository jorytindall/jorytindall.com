import { motion } from 'framer-motion';
import styles from 'styles/components/navigation/Header.module.scss';
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
		? styles.overlayVisible
		: styles.overlayHidden;

	return (
		<motion.div
			variants={overlayAnimation}
			initial="hidden"
			animate={overlay ? "enter" : "hidden"}
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
