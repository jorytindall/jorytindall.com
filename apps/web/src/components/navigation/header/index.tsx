import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Burger } from './Burger';
import { Overlay } from './Overlay';
import styles from 'styles/components/navigation/Header.module.scss';
import { Avatar } from 'components/avatar';

export const Header = () => {
	const route = useRouter().asPath;
	const [overlay, setOverlay] = useState(false);

	// Check to see if overlay is toggled, then return the appropriate class
	const getOverlayClass = overlay ? styles.headerOverlay : styles.header;

	// Reset the state of overlay after route change
	useEffect(() => setOverlay(false), [route]);

	return (
		<header className={getOverlayClass}>
			<Avatar />
			<Burger overlay={overlay} toggle={setOverlay} />
			<Overlay overlay={overlay} />
		</header>
	);
};
