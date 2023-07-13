import { useFathom } from 'hooks/useFathom'
import { Header, Footer } from 'components/navigation';
import 'styles/main.scss';

function MyApp({ Component, pageProps }) {

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
