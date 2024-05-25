import { motion } from 'framer-motion';
import styles from 'styles/components/navigation/Header.module.scss';
import { NavLinks } from './NavLinks'
import { NavItem } from './NavItem';
import { links } from './links';

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

export const Overlay = ({ overlay }: OverlayProps) => {
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
					<NavItem key={link.text} slug={link.slug} text={link.text} />
				))}
			</NavLinks>
		</motion.div>
	);
};
