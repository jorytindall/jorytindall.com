import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import Fathom from 'lib/fathom';
import { Header, Footer } from 'app/components/navigation';
import { Main } from 'app/components/layout';
import { ThemePicker } from 'app/components/theme-picker';
import 'styles/main.scss';

export const metadata = {
	title: 'Jory Tindall',
	description: 'Designer, saxophone artist, and educator.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>
					<ThemePicker />
					<Header />
					<Main>
						{children}
					</Main>
					<Footer />
					<Toaster />
					<Fathom />
					<Analytics />
				</Providers>
			</body>
		</html>
	);
}
