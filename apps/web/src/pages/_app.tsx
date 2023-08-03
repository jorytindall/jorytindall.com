import { useFathom } from 'hooks/useFathom'
import { getClient } from 'lib/sanity.server';
import { GET_FOOTER } from 'lib/queries'
import { Header, Footer } from 'components/navigation';
import 'styles/main.scss';

function MyApp({ Component, pageProps, data }) {

	// Fathom Analytics
	useFathom()

	console.log(data)

	return (
		<>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default MyApp;
