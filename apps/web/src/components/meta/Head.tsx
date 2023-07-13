import Head from 'next/head';

interface MetaHeadProps {
	title?: string;
	description?: string;
	ogImage?: string;
	slug?: string;
}

export const MetaHead = ({
	title,
	description = 'Jory Tindall; designer, saxophone artist, and educator.',
	ogImage,
	slug,
}: MetaHeadProps) => {
	return (
		<Head>
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
			<meta name="theme-color" content="#005eff"></meta>
			<title>{`${title} | Jory Tindall`}</title>
			<meta content="@jorytindall" name="twitter:site"></meta>
			<meta content="summary_large_image" name="twitter:card"></meta>
			<meta content={description} name="description"></meta>
			<meta content={title} property="og:title"></meta>
			<meta content={description} property="og:description"></meta>
			<meta content={`https://jorytindall/${slug}`} property="og:url"></meta>
			<meta content={ogImage} property="og:image"></meta>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/apple-touch-icon.png"
			></link>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon-32x32.png"
			></link>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon-16x16.png"
			></link>
			<link rel="manifest" href="/site.webmanifest"></link>
		</Head>
	);
};
