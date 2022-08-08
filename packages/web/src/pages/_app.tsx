import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	// Fathom Analytics
	useEffect(() => {
		Fathom.load(process.env.FATHOM_SITE_ID, {
			includedDomains: [ 'jorytindall.com' ]
		})

		function onRouteChangeComplete() {
			Fathom.trackPageview();
		}

		router.events.on('routeChangeComplete', onRouteChangeComplete);

		return () => {
			router.events.off('routeChangeComplete', onRouteChangeComplete);
		}
	}, [])

	return <Component {...pageProps} />;
}

export default MyApp;
