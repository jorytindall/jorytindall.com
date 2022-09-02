import { Code } from 'components/code'

export default function Home() {

	
	const code = `<section className={classes}>
	<SyntaxHighlighter
		language={language}
		style={dracula}
	>
		{code}
	</SyntaxHighlighter>
	{description && (
		<Paragraph type='secondary' collapse>{description}</Paragraph>
	)}
</section>`

	return (
		<div>
			<h1>Home page</h1>
			<Code
				code={code}
				language='javascript'
				description='This is the description'
			/>
		</div>
	);
}
