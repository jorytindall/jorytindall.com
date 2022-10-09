import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import 'styles/main.scss';
import { Layout } from 'components/layout';
import { MetaHead } from 'components/meta';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	// Fathom Analytics
	useEffect(() => {
		Fathom.load(process.env.FATHOM_SITE_ID, {
			includedDomains: ['jorytindall.com'],
		});

		function onRouteChangeComplete() {
			Fathom.trackPageview();
		}

		router.events.on('routeChangeComplete', onRouteChangeComplete);

		return () => {
			router.events.off('routeChangeComplete', onRouteChangeComplete);
		};
	}, [router.events]);

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
