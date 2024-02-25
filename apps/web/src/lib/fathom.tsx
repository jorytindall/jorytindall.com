'use client';

import { load, trackPageview } from 'fathom-client';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function TrackPageView() {
	const id = process.env.NEXT_PUBLIC_FATHOM_SITE_ID as string;
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		load(id, {
			includedDomains: ['jorytindall.com', 'www.jorytindall.com'],
		});
	}, [id]);

	useEffect(() => {
		trackPageview();
		// record a pageview when route changes
	}, [pathname, searchParams]);

	return null;
}

export default function Fathom() {
	return (
		<Suspense fallback={null}>
			<TrackPageView />
		</Suspense>
	);
}
