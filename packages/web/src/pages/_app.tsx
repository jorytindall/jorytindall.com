import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { useFathom } from 'hooks/useFathom'
import { Header, Footer } from 'components/navigation';
import 'styles/main.scss';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	// Fathom Analytics
	useFathom()

	return (
		<>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
