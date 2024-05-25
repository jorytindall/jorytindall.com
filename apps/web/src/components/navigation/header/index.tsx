'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Overlay } from './Overlay';
import styles from 'styles/components/navigation/Header.module.scss';
import { Avatar } from 'components/avatar';
import { NavTrigger } from './NavTrigger';

export const Header = () => {
	const route = usePathname();
	const [overlay, setOverlay] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Check to see if overlay is toggled, then return the appropriate class
	const getOverlayClass = overlay ? styles.headerOverlay : styles.header;

	// Reset the state of overlay after route change
	useEffect(() => setOverlay(false), [route]);

	// Change the header background on scroll
	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 5;
			if (isScrolled !== scrolled) {
				setScrolled(!scrolled);
			}
		}

		document.addEventListener('scroll', handleScroll);
		return () => {
			document.removeEventListener('scroll', handleScroll);
		}
	}, [scrolled])

	const setAvatarSize = scrolled ? 40 : 60;

	return (
		<header className={`${getOverlayClass} ${scrolled ? styles.scrolled : ''}`}>
			<Avatar width={setAvatarSize} height={setAvatarSize} />
			<NavTrigger overlay={overlay} toggle={setOverlay} />
			<Overlay overlay={overlay} />
		</header>
	);
};
