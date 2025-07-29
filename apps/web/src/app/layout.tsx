import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import Fathom from 'lib/fathom';
import { Header, Footer } from 'components/navigation';
import { Banner } from 'components/banner';
import { Main } from 'components/layout';
import 'styles/main.css';

import { sanityClient } from 'lib/sanity/config';
import { GET_GLOBAL_APP_DATA } from 'lib/queries';

const getGlobalAppData = async () => {
	const data = await sanityClient.fetch(GET_GLOBAL_APP_DATA);
	return data;
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	// Global app data
	const globalAppData = await getGlobalAppData();

	// Navigation
	const headerData = globalAppData.navigation.find((item: any) => item.area === 'header');
	const footerData = globalAppData.navigation.find((item: any) => item.area === 'footer');
	
	// Site settings
	const siteSettingsData = globalAppData.siteSettings;

	// Banner
	const bannerData = globalAppData.banner;
	
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>
						{bannerData !== null && (
							<Banner
								title={bannerData.title}
								content={bannerData.content}
								link={bannerData.link}
							/>
						)}
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
