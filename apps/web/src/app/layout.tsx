import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import Fathom from 'lib/fathom';
import { Header, Footer } from 'components/navigation';
import { Banner } from 'components/banner';
import { Main } from 'components/layout';
import 'styles/main.css';

import { sanityClient } from 'lib/sanity/config';
import { GET_GLOBAL_APP_DATA } from 'lib/queries';

import type { Metadata } from 'next';

const SITE_URL = 'https://jorytindall.com';
const SITE_TITLE = 'Jory Tindall | Designer, saxophone artist, educator.';
const SITE_DESCRIPTION =
	'Home of Jory Tindall; User experience designer, saxophone artist, and music educator based in Seattle, Washington.';

export const metadata: Metadata = {
	// Without this, every relative image URL a route hands to `openGraph` or `twitter`
	// resolves against localhost and Next warns at build time.
	metadataBase: new URL(SITE_URL),
	// Routes set only their own name — `title: 'Blog'` renders as `Blog | Jory Tindall`.
	// Use `title: { absolute: '...' }` in a route to opt out of the suffix.
	title: {
		default: SITE_TITLE,
		template: '%s | Jory Tindall',
	},
	description: SITE_DESCRIPTION,
	// Deliberately no `title`, `description` or `url` in either block below: Next fills
	// those per route from the resolved page title and description. Setting them here
	// would pin every page's og:title to the homepage's.
	openGraph: {
		type: 'website',
		siteName: 'Jory Tindall',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		site: '@jorytindall',
		creator: '@jorytindall',
	},
};

const getGlobalAppData = async () => {
	const data = await sanityClient.fetch(GET_GLOBAL_APP_DATA);
	return data;
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	// Global app data
	const globalAppData = await getGlobalAppData();

	// Navigation
	const headerData = globalAppData.navigation.find((item: any) => item.area === 'header');
	const footerData = globalAppData.navigation.find((item: any) => item.area === 'footer');

	// Site settings
	const siteSettingsData = globalAppData.siteSettings;

	// Banner
	const bannerData = globalAppData.banner;

	// Personal Stats
	const personalStatsData = globalAppData.personalStats;

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
					<Header links={headerData.links} personalStats={personalStatsData} />
					<Main>{children}</Main>
					<Footer
						internalLinks={footerData.links}
						socialLinks={siteSettingsData.socialLinks}
					/>
					<Toaster />
					<Fathom />
				</Providers>
			</body>
		</html>
	);
}
