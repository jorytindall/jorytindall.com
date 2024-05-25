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

	// Check to see if overlay is toggled, then return the appropriate class
	const getOverlayClass = overlay ? styles.headerOverlay : styles.header;

	// Reset the state of overlay after route change
	useEffect(() => setOverlay(false), [route]);

	return (
		<header className={getOverlayClass}>
			<Avatar />
			<NavTrigger overlay={overlay} toggle={setOverlay} />
			<Overlay overlay={overlay} />
		</header>
	);
};
