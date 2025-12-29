'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Overlay } from './Overlay';
import styles from './Header.module.css';
import { Avatar } from 'components/avatar';
import { NavTrigger } from './NavTrigger';

export const Header = ({ links, personalStats }) => {
	const route = usePathname();
	const [overlay, setOverlay] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Check to see if overlay is toggled, then return the appropriate class
	const getOverlayClass = overlay ? styles.headerOverlay : styles.header;

	// Handle scroll lock when overlay is toggled
	useEffect(() => {
		// Store the original body overflow style
		const originalStyle = window.getComputedStyle(document.body).overflow;
		
		if (overlay) {
				// Store current scroll position
				const scrollY = window.scrollY;
				
				// Add our CSS module class to body
				document.body.classList.add(styles.noScroll);
				
				// Set the scroll position as a CSS custom property
				document.body.style.setProperty('--scroll-position', `-${scrollY}px`);
		} else {
				// Get the stored scroll position before removing styles
				const scrollY = getComputedStyle(document.body)
						.getPropertyValue('--scroll-position')
						.replace('-', '')
						.replace('px', '');
				
				// Remove our CSS module class
				document.body.classList.remove(styles.noScroll);
				
				// Remove the custom property
				document.body.style.removeProperty('--scroll-position');
				
				// Restore scroll position if we have one
				if (scrollY) {
						window.scrollTo(0, parseInt(scrollY, 10));
				}
		}

		// Cleanup function
		return () => {
				document.body.classList.remove(styles.noScroll);
				document.body.style.removeProperty('--scroll-position');
				document.body.style.overflow = originalStyle;
		};
	}, [overlay]);

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
	}, [scrolled]);

	return (
		<header className={
			`${getOverlayClass} ${scrolled ? styles.scrolled : ''} ${overlay ? styles.overlayActive : ''}`
		}
		>
			<Avatar />
			<NavTrigger overlay={overlay} toggle={setOverlay} />
			<Overlay overlay={overlay} links={links} personalStats={personalStats} />
		</header>
	);
};
