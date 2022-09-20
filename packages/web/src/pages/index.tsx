import { linkResolver } from 'utils/linkResolver'

export default function Home() {

	const parent = 'page'
	const slug = 'about'
	console.log(linkResolver(parent, slug))
	return (
		<div>
			<h1>Home page</h1>
		</div>
	);
}
