import { MetaHead } from 'components/meta'

export default function Home() {
	return (
		<>
			<MetaHead
				title='Designer, saxophonist artist, and educator'
				description='Home of Jory Tindall; User experience designer, saxophone artist, and music educator based in Seattle, Washington.'
			/>
			<h1>Home page</h1>
		</>
	);
}

export async function getStaticProps() {
	return {
		props: {}
	}
}
