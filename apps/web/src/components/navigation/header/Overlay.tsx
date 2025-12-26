import { motion } from 'framer-motion';
import styles from './Overlay.module.css';
import { NavLinks } from './NavLinks'
import { NavItem } from './NavItem';
import { PersonalStats } from 'components/personal-stats';

interface OverlayProps {
	overlay?: any;
	links: {
		title: string;
		link: string;
		_key: string;
	}[];
	moduleContent?: any[];
}

const overlayAnimation = {
	hidden: {
		opacity: 0,
		transition: { duration: 0.2 },
	},
	enter: { opacity: 1, transition: { duration: 0.2 } },
};

export const Overlay = ({ overlay, links, moduleContent }: OverlayProps) => {
	const getOverlayClass = overlay
		? styles['overlay-visible']
		: styles['overlay-hidden'];

	console.log(moduleContent);

	return (
		<motion.div
			variants={overlayAnimation}
			initial="hidden"
			animate={overlay ? "enter" : "hidden"}
			// @ts-ignore
			className={getOverlayClass}
		>
			<div className={styles.overlayContent}>
				{moduleContent && moduleContent.length > 0 && (
					<div className={styles.moduleContentWrapper}>
						<PersonalStats input={moduleContent[0]} />
					</div>
				)}
				<NavLinks overlay={overlay}>
					{links.map((link) => (
						<NavItem key={link._key} slug={link.link} text={link.title} />
					))}
				</NavLinks>
			</div>
		</motion.div>
	);
};
