import { Analytics } from '@vercel/analytics/react';
import Fathom from 'lib/fathom';
import { Header, Footer } from 'app/components/navigation';
import { Main } from 'app/components/layout';
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
		<html lang="en">
			<body>
				<Header />
				<Main>
					{children}
				</Main>
				<Footer />
				<Fathom />
				<Analytics />
			</body>
		</html>
	);
}
