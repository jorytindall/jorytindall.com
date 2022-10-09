import Link from 'next/link';
import { getClasses } from 'utils/getClasses';
import { Headline } from 'components/typography';
import { FeaturedItem } from './FeaturedItem';
import styles from 'styles/components/navigation/Header.module.scss';

interface OverlayProps {
	overlay?: any;
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
		<div className={getOverlayClass}>
			<aside className={styles.linkWrapper}>
				{links.map((link) => {
					return (
						<Link href={link.slug} key={link.text}>
							<a className={styles.navLink}>{link.text}</a>
						</Link>
					);
				})}
			</aside>
		</div>
	);
};
