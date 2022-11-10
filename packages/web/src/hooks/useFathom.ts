import { useEffect } from 'react'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'

export const useFathom = () => {
    const router = useRouter();

    useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
				includedDomains: [
					'jorytindall.com',
					'www.jorytindall.com'
				],
			});
		}

		function onRouteChangeComplete() {
			Fathom.trackPageview();
		}

		router.events.on('routeChangeComplete', onRouteChangeComplete);

		return () => {
			router.events.off('routeChangeComplete', onRouteChangeComplete);
		};
	}, [router.events]);
}