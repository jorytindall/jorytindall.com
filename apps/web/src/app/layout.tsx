import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import Fathom from 'lib/fathom';
import { Header, Footer } from 'components/navigation';
import { Main } from 'components/layout';
import 'styles/main.scss';

import { sanityClient } from 'lib/sanity/sanityClient';
import { GET_NAVIGATION_DATA, GET_SITE_SETTINGS_DATA } from 'lib/queries';

export const getNavigationData = async () => {
	const data = await sanityClient.fetch(GET_NAVIGATION_DATA);
	return data;
}

const getSiteSettings = async () => {
	const data = await sanityClient.fetch(GET_SITE_SETTINGS_DATA);
	return data;
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Navigation data
	const navigationData = await getNavigationData();
	const headerData = navigationData.find((item: any) => item.area === 'header');
	const footerData = navigationData.find((item: any) => item.area === 'footer');

	// Site settings
	const siteSettings = await getSiteSettings();
	const siteSettingsData = siteSettings[0];

	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>
					<Header links={headerData.links} />
					<Main>
						{children}
					</Main>
					<Footer
						internalLinks={footerData.links}
						socialLinks={siteSettingsData.socialLinks}
					/>
					<Toaster />
					<Fathom />
					<Analytics />
				</Providers>
			</body>
		</html>
	);
}
