import { motion } from 'framer-motion';
import styles from './Overlay.module.css';
import { NavLinks } from './NavLinks'
import { NavItem } from './NavItem';
import { PersonalStats } from 'components/personal-stats';
import type { StatSource } from 'components/personal-stats';

interface OverlayProps {
	overlay?: boolean;
	links: {
		title: string;
		link: string;
		_key: string;
	}[];
	personalStats?: {
		_id: string;
		title?: string;
		statSources?: StatSource[];
	};
}

const overlayAnimation = {
	hidden: {
		opacity: 0,
		transition: { duration: 0.2 },
	},
	enter: { opacity: 1, transition: { duration: 0.2 } },
};

export const Overlay = ({ overlay = true, links, personalStats }: OverlayProps) => {
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
			<div className={styles.overlayContent}>
				{personalStats && (
					<div className={styles.statsWrapper}>
						<PersonalStats
							input={{
								_key: personalStats._id,
								title: personalStats.title,
								statSources: personalStats.statSources,
							}}
							overlay={overlay}
						/>
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
